const mongoose = require('mongoose');

const labSchema = new mongoose.Schema({
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
  testName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Requested', 'In Progress', 'Completed'],
    default: 'Requested'
  },
  result: {
    type: String,
    default: null
  },
  reportUrl: {
    type: String,
    default: null
  },
  requestedDate: {
    type: Date,
    default: Date.now
  },
  completedDate: {
    type: Date
  }
});

module.exports = mongoose.model('Lab', labSchema);