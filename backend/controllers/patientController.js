const Patient = require('../models/Patient');

// Add new patient
const addPatient = async (req, res) => {
  try {
    const { userId, age, gender, bloodGroup, allergies, address, emergencyContact, contactNumber, currentHealthStatus } = req.body;

    const patientExists = await Patient.findOne({ userId });
    if (patientExists) {
      return res.status(400).json({ message: 'Patient already exists' });
    }

    const patient = await Patient.create({
      userId,
      age,
      gender,
      bloodGroup,
      allergies,
      address,
      emergencyContact,
      contactNumber,
      currentHealthStatus
    });

    res.status(201).json({ message: 'Patient added successfully', patient });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all patients
const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate('userId', 'name email');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one patient
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId', 'name email');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update patient
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient updated successfully', patient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete patient
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addPatient, getAllPatients, getPatientById, updatePatient, deletePatient };