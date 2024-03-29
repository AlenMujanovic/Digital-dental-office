/* eslint-disable global-require */
/* eslint-disable no-console */
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const compression = require('compression');
const { expressjwt } = require('express-jwt');
const mongoose = require('mongoose');
const mongoSanitize = require('express-mongo-sanitize');
const lusca = require('lusca');
const path = require('path');
const ErrorHandler = require('./middlewares/errorHandling/errorHandler');
const mongoDB = require('./config/database/mongodb/connection');
const environments = require('./config/environments');
const { name } = require('./package.json');
const { rateLimiter } = require('./middlewares/rateLimiter');

const port = environments.PORT;
const appURL = `http://localhost:${port}/api/v1/`;

mongoose.Promise = global.Promise;

const app = express();

// Application Routes
const UserRoutes = require('./components/user/userRouter');
const AppointmentRoutes = require('./components/appointment/appointmentRouter');
const PrescriptionRoutes = require('./components/prescription/prescriptionRouter');
const ContactUsRoutes = require('./components/contactUs/contactUsRouter');

app.use(cors());
app.use(bodyParser.json({ limit: '20mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(mongoSanitize());
app.use(rateLimiter);

app.disable('x-powered-by');

// Security
app.use(lusca.xframe('ALLOWALL'));
app.use(lusca.xframe('SAMEORIGIN'));
app.use(lusca.xssProtection(true));

// Whitelisted routes
app.use(
  expressjwt({ secret: environments.JWT_SECRET, algorithms: ['HS256'] }).unless({
    path: [
      '/api/v1/user/signin',
      '/api/v1/user/signup',
      '/api/v1/user/refresh-token',
      '/api/v1/user/forgot-password',
      '/api/v1/contact',
      /\/apidoc\/?/,
    ],
  }),
);

mongoose.set('strictQuery', false);

// Create the database connection
mongoose.connect(mongoDB.connectionString());

mongoose.connection.on('connected', () => {
  console.log(`Mongoose default connection open to ${mongoDB.connectionString()}`);
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

app.use('/api/v1', UserRoutes);
app.use('/api/v1', AppointmentRoutes);
app.use('/api/v1', PrescriptionRoutes);
app.use('/api/v1', ContactUsRoutes);

require('./scripts/keepServerAwakeScript');
require('./scripts/appointmentScript');

app.use(ErrorHandler());

// show env vars
console.log(`__________ ${name} __________`);
console.log('Time server started:', new Date().toString());
console.log(`Starting on port: ${port}`);
console.log(`Env: ${environments.NODE_ENV}`);
console.log(`App url: ${appURL}`);
console.log('______________________________');

app.listen(port);
module.exports = app;
