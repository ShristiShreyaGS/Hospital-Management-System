const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  specialization: {
    type: String,
    required: true
  },
  degree: {
    type: String,
    required: true
  },
  yearsOfExperience: {
    type: Number,
    required: true
  },
  successRate: {
    type: Number,
    default: 0
  },
  workingDays: {
    type: [String],
    required: true
  },
  workingHours: {
    type: String,
    required: true
  },
  consultationFee: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Doctor', doctorSchema);