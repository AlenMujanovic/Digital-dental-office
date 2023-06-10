const express = require('express');
const AppointmentController = require('./appointmentController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router.get('/appointment', catchAsyncError(AppointmentController.appointments));
router.patch('/appointment/:appointmentId', catchAsyncError(AppointmentController.updateAppointment));

module.exports = router;
