const Admission = require('../models/Admission');
const Bed = require('../models/Bed');

const admitPatient = async (req, res) => {
  try {
    const { patientId, doctorId, bedId, reason } = req.body;

    // Check if bed is available
    const bed = await Bed.findById(bedId);
    if (!bed) {
      return res.status(404).json({ message: 'Bed not found' });
    }
    if (bed.status === 'Occupied') {
      return res.status(400).json({ message: 'Bed is already occupied' });
    }

    // Create admission
    const admission = await Admission.create({
      patientId, doctorId, bedId, reason
    });

    // Update bed status
    await Bed.findByIdAndUpdate(bedId, {
      status: 'Occupied',
      patientId
    });

    res.status(201).json({ message: 'Patient admitted successfully', admission });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const dischargePatient = async (req, res) => {
  try {
    const admission = await Admission.findByIdAndUpdate(
      req.params.id,
      { status: 'Discharged', dischargeDate: Date.now() },
      { new: true }
    );

    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }

    // Free up the bed
    await Bed.findByIdAndUpdate(admission.bedId, {
      status: 'Available',
      patientId: null
    });

    res.status(200).json({ message: 'Patient discharged successfully', admission });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find()
      .populate('patientId')
      .populate('doctorId')
      .populate('bedId');
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmissionById = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId')
      .populate('bedId');
    if (!admission) {
      return res.status(404).json({ message: 'Admission not found' });
    }
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { admitPatient, dischargePatient, getAllAdmissions, getAdmissionById };