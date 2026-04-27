const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  previousRecords: {
    type: String,
    default: 'None'
  },
  emergencyContact: {
    type: String,
    required: true
  },
  contactNumber: {
    type: String,
    required: true
  },
  currentHealthStatus: {
    type: String,
    default: 'Healthy'
  }
});

module.exports = mongoose.model('Patient', patientSchema);