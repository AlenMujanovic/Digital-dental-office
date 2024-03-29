const express = require('express');
const UserController = require('./userController');
const { catchAsyncError } = require('../../lib/functionErrorHandler');
const { permissionAccess } = require('../../middlewares/permissionAccess');

const router = express.Router();

router
  .post('/user/signin', catchAsyncError(UserController.signIn))
  .post('/user/signup', catchAsyncError(UserController.signUp))
  .post('/user/change-password', permissionAccess(), catchAsyncError(UserController.changePassword))
  // .post('/user/forgot-password', catchAsyncError(UserController.forgotPassword))
  // .post('/user/reset-password/:resetToken', catchAsyncError(UserController.resetPassword))
  .get('/user/logged-user', permissionAccess(), catchAsyncError(UserController.getProfile))
  .post('/user/refresh-token', catchAsyncError(UserController.refreshToken))
  .get('/user/patient', permissionAccess('Doctor'), catchAsyncError(UserController.getPatients))
  .patch('/user/edit-profile', permissionAccess(), catchAsyncError(UserController.editProfile));

module.exports = router;
