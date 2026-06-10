const Lab = require('../models/Lab');
const Doctor = require('../models/Doctor');
const Patient = require('../models/Patient');
const createNotification = require('../utils/notificationHelper')

const populateLab = (query) => query
  .populate({ path: 'patientId', populate: { path: 'userId', select: 'name' } })
  .populate({ path: 'doctorId', populate: { path: 'userId', select: 'name specialization' } })

const orderLabTest = async (req, res) => {
  try {
    const { patientId, doctorId, testName } = req.body;

    const lab = await Lab.create({ patientId, doctorId, testName });
    const populated = await populateLab(Lab.findById(lab._id))

    res.status(201).json({ message: 'Lab test ordered successfully', lab: populated });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLabTests = async (req, res) => {
  try {
    const { role, id: userId } = req.user;

    let filter = {};
    
    if (role === 'patient') {
      // Look up the Patient document by userId
      const patient = await Patient.findOne({ userId });
      if (!patient) {
        return res.status(404).json({ message: 'Patient profile not found' });
      }
      filter = { patientId: patient._id };
    } else if (role === 'doctor') {
      // Look up the Doctor document by userId
      const doctor = await Doctor.findOne({ userId });
      if (!doctor) {
        return res.status(404).json({ message: 'Doctor profile not found' });
      }
      filter = { doctorId: doctor._id };
    }

    const labs = await populateLab(Lab.find(filter).sort({ requestedDate: -1 }))
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabTestById = async (req, res) => {
  try {
    const lab = await populateLab(Lab.findById(req.params.id))
    if (!lab) return res.status(404).json({ message: 'Lab test not found' });
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabTestsByPatient = async (req, res) => {
  try {
    const labs = await populateLab(
      Lab.find({ patientId: req.params.patientId }).sort({ requestedDate: -1 })
    )
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLabTest = async (req, res) => {
  try {
    const existing = await Lab.findById(req.params.id);
    if (!existing) return res.status(404).json({ message: 'Lab test not found' });

    const lab = await populateLab(
      Lab.findByIdAndUpdate(req.params.id, req.body, { new: true })
    )

    // Notify patient when lab test is completed
    try {
      if (req.body.status === 'Completed' && existing.status !== 'Completed') {
        const patient = await Patient.findById(existing.patientId).populate('userId', '_id')
        if (patient?.userId) {
          await createNotification({
            userId: patient.userId._id,
            title: 'Lab Test Results Ready',
            message: `Your ${existing.testType} lab test results are ready for review`,
            type: 'Lab',
            priority: 'High',
            relatedEntity: 'Lab',
            relatedEntityId: existing._id,
            actionUrl: '/lab'
          })
        }
      }
    } catch (e) { console.error('Notification error:', e.message) }

    res.status(200).json({ message: 'Lab test updated successfully', lab });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLabTest = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndDelete(req.params.id);
    if (!lab) return res.status(404).json({ message: 'Lab test not found' });
    res.status(200).json({ message: 'Lab test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderLabTest, getAllLabTests, getLabTestById, getLabTestsByPatient, updateLabTest, deleteLabTest };