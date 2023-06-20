const { Appointment, statuses } = require('./appointment');
const { User, roles, genders } = require('./user');
const { Prescription } = require('./prescription');

module.exports = {
  User,
  roles,
  genders,
  Appointment,
  statuses,
  Prescription,
};
