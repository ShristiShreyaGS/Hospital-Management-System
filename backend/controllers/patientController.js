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
    const patients = await Patient.find().populate('userId', 'name email phone role');
    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get one patient
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate('userId', 'name email phone role');
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
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check authorization: allow if admin/staff or if patient is updating their own profile
    if (req.user.role === 'patient' && patient.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this patient profile' });
    }

    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate('userId', 'name email phone');
    
    res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });
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