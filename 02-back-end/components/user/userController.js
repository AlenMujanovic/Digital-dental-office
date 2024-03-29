const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, roles } = require('../../models');
const { issueNewToken } = require('../../lib/jwtHandler');
const { customShortId } = require('../../lib/misc');
const { sendEmail, emailTemplates } = require('../../lib/emailHandler');
const error = require('../../middlewares/errorHandling/errorConstants');
const { JWT_SECRET } = require('../../config/environments');

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select('+password').lean();

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  if (!user.isActive) {
    throw new Error(error.FORBIDDEN);
  }

  if (!bcrypt.compareSync(password, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR);
  }

  delete user.password;

  return res.status(200).send({
    message: 'Successfully signed in',
    token: issueNewToken(user),
    results: user,
  });
};

module.exports.signUp = async (req, res) => {
  const { name, email, password, phone, gender, address } = req.body;

  if (!name || !email || !password || !phone || !gender || !address) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  await User.create({
    name,
    email,
    password,
    phone,
    gender,
    address,
    role: 'Patient',
  });

  return res.status(200).send({
    message: 'Successfully signed up',
  });
};

module.exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const resetToken = customShortId();
  const user = await User.findOne({ email: email.toLowerCase() }).lean();

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  await User.updateOne({ email }, { resetToken });

  await sendEmail(email, 'Reset Password', emailTemplates.forgotPassword({ resetToken }));
  return res.status(200).send({
    message: 'Successfully generated reset token',
  });
};

module.exports.resetPassword = async (req, res) => {
  const { resetToken } = req.params;
  const { password, passwordConfirm } = req.body;

  if (!password || !passwordConfirm || !resetToken) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (password !== passwordConfirm) throw new Error(error.INVALID_VALUE);

  const newPassword = bcrypt.hashSync(password, 10);

  const user = await User.findOneAndUpdate(
    { resetToken },
    {
      $set: { password: newPassword },
      $unset: { resetToken: '' },
    },
    { new: true }
  );

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  return res.status(200).send({
    message: 'Password updated',
    token: issueNewToken(user),
  });
};

module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmNewPassword } = req.body;
  const { _id } = req.user;

  if (!oldPassword || !newPassword) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (newPassword !== confirmNewPassword) throw new Error(error.INVALID_VALUE);

  const user = await User.findOne({ _id }, { password: 1 }).lean();

  if (!bcrypt.compareSync(oldPassword, user.password)) {
    throw new Error(error.CREDENTIALS_ERROR);
  }
  if (newPassword !== confirmNewPassword) {
    throw new Error(error.INVALID_VALUE);
  }

  const password = bcrypt.hashSync(newPassword, 10);
  await User.updateOne({ _id }, { password });

  return res.status(200).send({
    message: 'Password successfully updated',
  });
};

module.exports.getProfile = async (req, res) =>
  res.status(200).send({
    message: 'Successfully returned profile',
    results: req.user,
  });

module.exports.editProfile = async (req, res) => {
  const { name, address, phone } = req.body;

  if (!name || !address || !phone) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const { _id: userId } = req.user;

  const results = await User.findOneAndUpdate(
    { _id: userId },
    {
      name,
      address,

      phone,
    },
    { new: true, omitUndefined: true }
  ).lean();

  return res.status(200).send({
    message: 'Successfully updated profile',
    results,
  });
};

module.exports.refreshToken = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const decoded = jwt.decode(token, JWT_SECRET);

  if (decoded === null) {
    throw new Error(error.NOT_FOUND);
  }

  const user = await User.findOne({ _id: decoded._id }).lean();

  if (!user) {
    throw new Error(error.NOT_FOUND);
  }

  return res.status(200).send({
    message: 'Successfully refreshed token',
    token: issueNewToken(user),
  });
};

module.exports.getPatients = async (req, res) => {
  const results = await User.find({ role: 'Patient' }).lean();

  return res.status(200).send({
    message: 'Successfully returned list of patients',
    results,
  });
};
