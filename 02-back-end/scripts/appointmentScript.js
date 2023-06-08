/* eslint-disable no-plusplus */
/* eslint-disable import/no-extraneous-dependencies */

const cron = require('node-cron');
const mongoose = require('mongoose');
const { Appointment } = require('../models/appointment');
const { MONGO_DB } = require('../config/environments');

const MS_PER_HOUR = 1000 * 60 * 60;
const WORKING_HOURS_START = 8;
const WORKING_HOURS_END = 17;

function createAppointmentsForNextMonth() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();

    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      for (let hour = WORKING_HOURS_START; hour < WORKING_HOURS_END; hour++) {
        const startTimeAndDate = new Date(year, month, day, hour);
        const endTimeAndDate = new Date(startTimeAndDate.getTime() + MS_PER_HOUR);

        Appointment.create({
          startTimeAndDate,
          endTimeAndDate,
          status: 'Free',
        });
      }
    }
  }
}

function createAppointmentsForTomorrow() {
  const now = new Date();

  const year = now.getFullYear();
  const month = now.getMonth();
  const day = now.getDate() + 1;

  for (let hour = WORKING_HOURS_START; hour < WORKING_HOURS_END; hour++) {
    const startTimeAndDate = new Date(year, month, day, hour);
    const endTimeAndDate = new Date(startTimeAndDate.getTime() + MS_PER_HOUR);

    Appointment.create({
      startTimeAndDate,
      endTimeAndDate,
      status: 'Free',
    });
  }
}

// Schedule a task to run at midnight on the last day of every month
cron.schedule('0 0 28-31 * *', () => {
  if (new Date().getDate() === new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate()) {
    createAppointmentsForNextMonth();
  }
});

// Create the database connection
mongoose.connect(MONGO_DB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${MONGO_DB}`);
  // createAppointmentsForNextMonth();
});
// CONNECTION EVENTS
// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose default connection error: ${err}`);
});
// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});
// When the connection is open
mongoose.connection.on('open', () => {
  console.log('Mongoose default connection is open');
});
// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});
