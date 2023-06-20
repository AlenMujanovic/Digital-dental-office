const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { emailRegExp, phoneRegExp } = require('../lib/misc');

const { Schema } = mongoose;

const roles = ['Doctor', 'Patient'];
const genders = ['Male', 'Female'];

const UserSchema = new Schema(
  {
    name: { type: String, trim: true, required: true },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      match: [emailRegExp, 'Invalid email'],
      required: 'Please enter an email address',
    },
    password: { type: String, required: true, select: false, minlength: 6 },
    isActive: { type: Boolean, default: true },
    phone: {
      type: String,
      trim: true,
      match: [phoneRegExp, 'Invalid phone number'],
      required: 'Please enter phone number',
    },
    gender: { type: String, enum: genders, required: true },
    address: { type: String, required: true, trim: true },
    role: { type: String, enum: roles },
    resetToken: String,
    activationCode: String,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

module.exports = {
  User: mongoose.model('User', UserSchema),
  roles,
  genders,
};
