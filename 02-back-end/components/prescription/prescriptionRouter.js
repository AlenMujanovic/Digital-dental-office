const express = require('express');
const PrescriptionController = require('./prescriptionController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router.get('/prescription', permissionAccess('Doctor', 'Patient'), catchAsyncError(PrescriptionController.getPrescriptionsByUser));
router.post('/prescription', permissionAccess('Doctor'), catchAsyncError(PrescriptionController.createPrescription));

module.exports = router;
