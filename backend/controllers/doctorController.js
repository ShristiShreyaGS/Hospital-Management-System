const Doctor = require('../models/Doctor');

const addDoctor = async (req, res) => {
  try {
    const { userId, specialization, degree, yearsOfExperience, successRate, workingDays, workingHours, consultationFee } = req.body;

    const doctorExists = await Doctor.findOne({ userId });
    if (doctorExists) {
      return res.status(400).json({ message: 'Doctor already exists' });
    }

    const doctor = await Doctor.create({
      userId,
      specialization,
      degree,
      yearsOfExperience,
      successRate,
      workingDays,
      workingHours,
      consultationFee
    });

    res.status(201).json({ message: 'Doctor added successfully', doctor });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().populate('userId', 'name email');
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).populate('userId', 'name email');
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
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
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