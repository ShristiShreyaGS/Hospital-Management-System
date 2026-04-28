const mongoose = require('mongoose');

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
  diagnosis: {
    type: String,
    required: true
  },
  treatment: {
    type: String,
    required: true
  },
  prescription: {
    type: [String],
    default: []
  },
  attachments: {
    type: [String],
    default: []
  },
  notes: {
    type: String
  },
  visitDate: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('EMR', emrSchema);