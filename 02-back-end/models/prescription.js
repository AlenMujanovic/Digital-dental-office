const mongoose = require('mongoose');

const { Schema } = mongoose;

const PrescriptionSchema = new Schema(
  {
    dateAndTime: { type: Date, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Prescription: mongoose.model('Prescription', PrescriptionSchema),
};
