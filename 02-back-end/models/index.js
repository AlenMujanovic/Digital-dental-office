const { Appointment, statuses, types } = require('./appointment');
const { User, roles, genders } = require('./user');
const { Prescription } = require('./prescription');

module.exports = {
  User,
  roles,
  genders,
  Appointment,
  statuses,
  types,
  Prescription,
};
