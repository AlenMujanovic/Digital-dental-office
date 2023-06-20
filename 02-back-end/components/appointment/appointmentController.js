const error = require('../../middlewares/errorHandling/errorConstants');
const { Appointment, statuses } = require('../../models');

module.exports.appointments = async (req, res) => {
  const { date } = req.query;

  if (Number.isNaN(Date.parse(date)) || new Date(date) < new Date()) {
    throw new Error(error.INVALID_VALUE);
  }

  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  const results = await Appointment.find({ startTimeAndDate: { $gte: startDate, $lt: endDate } })
    .populate('user')
    .lean();

  return res.status(200).send({
    message: 'Successfully returned list of appointments',
    results,
  });
};

module.exports.updateAppointment = async (req, res) => {
  const { type, status } = req.body;
  const { _id: userId } = req.auth;
  const { appointmentId } = req.params;

  if (!appointmentId || !userId || !status) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  if (!statuses.includes(status)) {
    throw new Error(error.INVALID_VALUE);
  }

  const results = await Appointment.findOneAndUpdate({ _id: appointmentId }, { type, status, user: userId }, { new: true }).lean();

  return res.status(200).send({
    message: 'Successfully updated appointment',
    results,
  });
};

module.exports.appointmentsForUser = async (req, res) => {
  const { date } = req.query;
  const { _id: userId } = req.auth;

  if (Number.isNaN(Date.parse(date)) || new Date(date) < new Date()) {
    throw new Error(error.INVALID_VALUE);
  }

  if (!userId) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  const results = await Appointment.find({ startTimeAndDate: { $gte: startDate, $lt: endDate }, user: userId })
    .populate('user')
    .lean();

  return res.status(200).send({
    message: 'Successfully returned list of appointments',
    results,
  });
};

module.exports.appointmentsByRole = async (req, res) => {
  const { date } = req.query;
  const { _id: userId, role } = req.user;

  if (Number.isNaN(Date.parse(date))) {
    throw new Error(error.INVALID_VALUE);
  }

  if (!userId) {
    throw new Error(error.MISSING_PARAMETERS);
  }

  const startDate = new Date(date);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 1);

  let results;
  if (role === 'Patient') {
    results = await Appointment.find({ startTimeAndDate: { $gte: startDate, $lt: endDate }, user: userId })
      .populate('user')
      .lean();
  } else if (role === 'Doctor') {
    results = await Appointment.find({ startTimeAndDate: { $gte: startDate, $lt: endDate } })
      .populate('user')
      .lean();
  }

  return res.status(200).send({
    message: 'Successfully returned list of appointments',
    results,
  });
};
