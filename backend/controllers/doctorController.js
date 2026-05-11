const Doctor = require('../models/Doctor');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const addDoctor = async (req, res) => {
  try {
    const {
      // User fields
      name, username, email, password, phone,
      // Doctor fields
      specialization, degree, yearsOfExperience,
      successRate, workingDays, workingHours, consultationFee
    } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user account
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      phone,
      role: 'doctor',
    });

    // Create doctor profile
    const doctor = await Doctor.create({
      userId: user._id,
      specialization,
      degree,
      yearsOfExperience,
      successRate,
      workingDays,
      workingHours,
      consultationFee
    });

    const populatedDoctor = await Doctor.findById(doctor._id).populate('userId', 'name email')

    res.status(201).json({ message: 'Doctor added successfully', doctor: populatedDoctor });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email phone');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email phone');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('userId', 'name email phone');
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor updated successfully', doctor });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addDoctor, getAllDoctors, getDoctorById, updateDoctor, deleteDoctor };