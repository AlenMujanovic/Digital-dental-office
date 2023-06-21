const mongoose = require('mongoose');
const error = require('../../middlewares/errorHandling/errorConstants');
const { Prescription } = require('../../models');

module.exports.createPrescription = async (req, res) => {
  const { user, description } = req.body;

  if (!user || !description) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const isValidUser = mongoose.Types.ObjectId.isValid(user);
  if (!isValidUser) {
    throw new Error(error.INVALID_VALUE);
  }

  await Prescription.create({ user, description });

  return res.status(200).send({
    message: 'Successfully created prescription',
  });
};

module.exports.getPrescriptionsByUser = async (req, res) => {
  const { user } = req.query;
  const { _id: userId, role } = req.user;

  if (role === 'Doctor' && !user) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const isValidUser = mongoose.Types.ObjectId.isValid(user);
  if (role === 'Doctor' && !isValidUser) {
    throw new Error(error.INVALID_VALUE);
  }

  let results;

  if (role === 'Doctor') {
    // Find prescriptions for the provided user
    results = await Prescription.find({ user }).populate('user');
  } else if (role === 'Patient') {
    // Find prescriptions for the current user (patient)
    results = await Prescription.find({ user: userId }).populate('user');
  }

  return res.status(200).send({
    message: 'Successfully retrieved prescriptions',
    results,
  });
};
