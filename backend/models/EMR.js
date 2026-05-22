const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  medicine: { type: String, required: true },
  dosage: { type: String, required: true },    // e.g. "500mg"
  frequency: { type: String, required: true }, // e.g. "Twice a day"
  duration: { type: String, required: true },  // e.g. "5 days"
  instructions: { type: String },              // e.g. "After meals"
})

const emrSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
  },
  visitDate: {
    type: Date,
    default: Date.now
  },
  symptoms: {
    type: [String],
    default: []
  },
  diagnosis: {
    type: String,
    required: true
  },
  notes: {
    type: String,
  },
  prescription: {
    type: [prescriptionSchema],
    default: []
  },
  followUpDate: {
    type: Date,
  },
  bloodPressure: { type: String },   // e.g. "120/80"
  temperature: { type: String },     // e.g. "98.6°F"
  weight: { type: String },          // e.g. "70kg"
  heartRate: { type: String },       // e.g. "72 bpm"
}, { timestamps: true })

module.exports = mongoose.model('EMR', emrSchema);