const EMR = require('../models/EMR');

const addEMR = async (req, res) => {
  try {
    const { patientId, diagnosis, doctorId, appointmentId, visitDate, symptoms, notes, followUpDate, bloodPressure, temperature, weight, heartRate, prescription } = req.body;
    
    // Validate required fields
    if (!patientId || !diagnosis) {
      return res.status(400).json({ message: 'patientId and diagnosis are required' });
    }

    let finalDoctorId = doctorId;
    
    // If doctorId not provided, try to get it from authenticated user
    if (!finalDoctorId) {
      const Doctor = require('../models/Doctor');
      const doctor = await Doctor.findOne({ userId: req.user.id });
      if (doctor) {
        finalDoctorId = doctor._id;
      } else if (req.user.role === 'doctor') {
        // If user is a doctor but no profile exists, return error
        return res.status(400).json({ message: 'Doctor profile not found. Please contact admin.' });
      } else {
        // Non-doctor users must provide doctorId
        return res.status(400).json({ message: 'doctorId is required' });
      }
    }

    // Create EMR with proper data types
    const emr = await EMR.create({
      patientId,
      doctorId: finalDoctorId,
      appointmentId: appointmentId || null,
      visitDate: visitDate ? new Date(visitDate) : new Date(),
      diagnosis,
      symptoms: Array.isArray(symptoms) ? symptoms : [],
      notes: notes || '',
      followUpDate: followUpDate ? new Date(followUpDate) : null,
      bloodPressure: bloodPressure || '',
      temperature: temperature || '',
      weight: weight || '',
      heartRate: heartRate || '',
      prescription: Array.isArray(prescription) ? prescription.filter(p => p.medicine) : []
    });

    const populatedEMR = await EMR.findById(emr._id)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email' }
      });
    res.status(201).json({ message: 'EMR created successfully', emr: populatedEMR });
  } catch (error) {
    console.error('Error creating EMR:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllEMRs = async (req, res) => {
  try {
    const emrs = await EMR.find()
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email' }
      });
    res.status(200).json(emrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEMRById = async (req, res) => {
  try {
    const emr = await EMR.findById(req.params.id)
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email' }
      });
    if (!emr) {
      return res.status(404).json({ message: 'EMR not found' });
    }
    res.status(200).json(emr);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEMRByPatient = async (req, res) => {
  try {
    const emrs = await EMR.find({ patientId: req.params.patientId })
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email' }
      });
    res.status(200).json(emrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEMR = async (req, res) => {
  try {
    const emr = await EMR.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .populate({
        path: 'patientId',
        populate: { path: 'userId', select: 'name email' }
      })
      .populate({
        path: 'doctorId',
        populate: { path: 'userId', select: 'name email' }
      });
    if (!emr) {
      return res.status(404).json({ message: 'EMR not found' });
    }
    res.status(200).json({ message: 'EMR updated successfully', emr });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteEMR = async (req, res) => {
  try {
    const emr = await EMR.findByIdAndDelete(req.params.id);
    if (!emr) {
      return res.status(404).json({ message: 'EMR not found' });
    }
    res.status(200).json({ message: 'EMR deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addEMR, getAllEMRs, getEMRById, getEMRByPatient, updateEMR, deleteEMR };