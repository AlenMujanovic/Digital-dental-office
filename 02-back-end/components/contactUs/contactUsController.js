const error = require('../../middlewares/errorHandling/errorConstants');
const { ContactUs } = require('../../models/contactUs');

module.exports.contactUs = async (req, res) => {
  const { name, description, email } = req.body;

  if (!name || !description || !email) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  await ContactUs.create({ name, description, email });

  return res.status(200).send({
    message: 'Successfully contacted us',
  });
};
