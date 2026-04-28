const mongoose = require('mongoose');

const pharmacySchema = new mongoose.Schema({
  medicineName: {
    type: String,
    required: true,
    unique: true
  },
  category: {
    type: String,
    required: true
  },
  manufacturer: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true
  },
  lowStockAlert: {
    type: Number,
    default: 10
  },
  expiryDate: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Pharmacy', pharmacySchema);