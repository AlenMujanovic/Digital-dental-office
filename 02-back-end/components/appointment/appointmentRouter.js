const express = require('express');
const AppointmentController = require('./appointmentController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router.get('/appointment', permissionAccess(), catchAsyncError(AppointmentController.appointments));
router.patch('/appointment/:appointmentId', permissionAccess(), catchAsyncError(AppointmentController.updateAppointment));
router.get('/appointment/user', permissionAccess(), catchAsyncError(AppointmentController.appointmentsForUser));

module.exports = router;
