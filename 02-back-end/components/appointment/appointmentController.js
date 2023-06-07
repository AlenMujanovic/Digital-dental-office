const error = require('../../middlewares/errorHandling/errorConstants');
const { Appointment } = require('../../models');

module.exports.appointments = async (req, res) => {
  const { date } = req.query;

  if (Number.isNaN(Date.parse(date)) || new Date(date) < new Date()) {
    throw new Error(error.INVALID_VALUE);
  }

  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  const results = await Appointment.find({ startTimeAndDate: { $gte: startDate, $lt: endDate } }).lean();

  return res.status(200).send({
    message: 'Successfully returned list of appointments',
    results,
  });
};
