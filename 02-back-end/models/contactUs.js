const mongoose = require('mongoose');
const { emailRegExp } = require('../lib/misc');

const { Schema } = mongoose;

const ContactUsSchema = new Schema(
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
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  ContactUs: mongoose.model('ContactUs', ContactUsSchema),
};
