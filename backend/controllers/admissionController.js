const Admission = require('../models/Admission');
const Bed = require('../models/Bed');

const populateAdmission = (query) => query
  .populate({ path: 'patientId', populate: { path: 'userId', select: 'name' } })
  .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name specialization' } })
  .populate('bedId', 'bedNumber ward room')

const admitPatient = async (req, res) => {
  try {
    const { patientId, doctorId, bedId, reason } = req.body;

    const bed = await Bed.findById(bedId);
    if (!bed) return res.status(404).json({ message: 'Bed not found' });
    if (bed.status === 'Occupied') {
      return res.status(400).json({ message: 'Bed is already occupied' });
    }

    const admission = await Admission.create({ patientId, doctorId, bedId, reason });
    await Bed.findByIdAndUpdate(bedId, { status: 'Occupied', patientId })

    const populated = await populateAdmission(Admission.findById(admission._id))
    res.status(201).json({ message: 'Patient admitted successfully', admission: populated });
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
    if (!admission) return res.status(404).json({ message: 'Admission not found' });

    await Bed.findByIdAndUpdate(admission.bedId, { status: 'Available', patientId: null })

    const populated = await populateAdmission(Admission.findById(admission._id))
    res.status(200).json({ message: 'Patient discharged successfully', admission: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAdmissions = async (req, res) => {
  try {
    const admissions = await populateAdmission(Admission.find().sort({ admissionDate: -1 }))
    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAdmissionById = async (req, res) => {
  try {
    const admission = await populateAdmission(Admission.findById(req.params.id))
    if (!admission) return res.status(404).json({ message: 'Admission not found' });
    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { admitPatient, dischargePatient, getAllAdmissions, getAdmissionById };