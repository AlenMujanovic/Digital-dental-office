const mongoose = require('mongoose');

const { Schema } = mongoose;

const statuses = ['Free', 'Canceled', 'Pending', 'Done'];

const AppointmentSchema = new Schema(
  {
    startTimeAndDate: { type: Date, trim: true, required: true },
    endTimeAndDate: { type: Date, trim: true, required: true },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    type: { type: String, default: 'DentalExam' },
    status: { type: String, enum: statuses, default: 'Free' },
  },
  {
    timestamps: true,
  }
);

module.exports = {
  Appointment: mongoose.model('Appointment', AppointmentSchema),
  statuses,
};
