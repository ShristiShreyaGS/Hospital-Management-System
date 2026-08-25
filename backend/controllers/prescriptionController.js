const Prescription = require('../models/Prescription');
const Patient = require('../models/Patient');
const Doctor = require('../models/Doctor');

const createPrescription = async (req, res) => {
  try {
    const { patientId, medicine, dosage, frequency, duration, instructions, emrId } = req.body;
    if (!patientId || !medicine || !dosage || !frequency || !duration) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // ensure patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: 'Patient not found' });

    // ensure doctor exists for authenticated doctor
    const doctor = await Doctor.findOne({ userId: req.user.id });
    if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });

    const pres = await Prescription.create({
      patientId,
      doctorId: doctor._id,
      emrId: emrId || null,
      medicine,
      dosage,
      frequency,
      duration,
      instructions: instructions || ''
    });

    const populated = await pres
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name email' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } });

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrescriptions = async (req, res) => {
  try {
    let prescriptions;
    if (req.user.role === 'patient') {
      const patient = await Patient.findOne({ userId: req.user.id });
      if (!patient) return res.status(404).json({ message: 'Patient profile not found' });
      prescriptions = await Prescription.find({ patientId: patient._id });
    } else if (req.user.role === 'doctor') {
      const doctor = await Doctor.findOne({ userId: req.user.id });
      if (!doctor) return res.status(404).json({ message: 'Doctor profile not found' });
      prescriptions = await Prescription.find({ doctorId: doctor._id });
    } else if (['admin','pharmacist','nurse','lab_staff','receptionist'].includes(req.user.role)) {
      prescriptions = await Prescription.find();
    } else {
      return res.status(403).json({ message: 'Not authorized to view prescriptions' });
    }

    const populated = await Prescription.populate(prescriptions, [
      { path: 'patientId', populate: { path: 'userId', select: 'name email' } },
      { path: 'doctorId', populate: { path: 'userId', select: 'name email' } }
    ]);
    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPrescriptionById = async (req, res) => {
  try {
    const pres = await Prescription.findById(req.params.id)
      .populate({ path: 'patientId', populate: { path: 'userId', select: 'name email' } })
      .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name email' } });
    if (!pres) return res.status(404).json({ message: 'Prescription not found' });

    if (req.user.role === 'patient') {
      const patientUserId = pres.patientId?.userId?._id?.toString();
      if (patientUserId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    }

    res.status(200).json(pres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createPrescription, getPrescriptions, getPrescriptionById };
