const express = require('express');
const ContactUsController = require('./contactUsController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');

const router = express.Router();

router.post('/contact', catchAsyncError(ContactUsController.contactUs));

module.exports = router;
