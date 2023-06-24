const express = require('express');
const AppointmentController = require('./appointmentController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router.get('/appointment', permissionAccess(), catchAsyncError(AppointmentController.appointmentsByDate));
router.get('/appointment/recent', permissionAccess(), catchAsyncError(AppointmentController.appointmentsForLast6Months));
router.get('/appointment/upcoming', permissionAccess(), catchAsyncError(AppointmentController.upcomingAppointments));
router.patch('/appointment/:appointmentId', permissionAccess(), catchAsyncError(AppointmentController.updateAppointment));
router.patch('/appointment/status/:appointmentId', permissionAccess('Doctor'), catchAsyncError(AppointmentController.updateAppointmentStatus));
router.get('/appointment/user', permissionAccess(), catchAsyncError(AppointmentController.appointmentsForUser));
router.get('/appointment/user/role', permissionAccess(), catchAsyncError(AppointmentController.appointmentsByRole));

module.exports = router;
