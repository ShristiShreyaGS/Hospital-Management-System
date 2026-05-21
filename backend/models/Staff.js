const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    default: null,
  },
  position: {
    type: String,
    enum: ['Doctor', 'Nurse', 'Receptionist', 'Administrator', 'Lab_Staff', 'Pharmacist'],
    required: true
  },
  specialization: {
    type: String,
    default: 'General'
  },
  experience: {
    type: Number,
    default: 0
  },
  licenseNumber: {
    type: String,
    default: null
  },
  licenseExpiry: {
    type: Date,
    default: null
  },
  qualifications: {
    type: [String],
    default: []
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'On Leave'],
    default: 'Active'
  },
  contactNumber: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  shift: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Night', ''],
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Staff', staffSchema);