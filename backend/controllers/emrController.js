const EMR = require('../models/EMR');

const addEMR = async (req, res) => {
  try {
    const { patientId, doctorId, diagnosis, treatment, prescription, attachments, notes } = req.body;

    const emr = await EMR.create({
      patientId, doctorId, diagnosis, treatment, prescription, attachments, notes
    });

    res.status(201).json({ message: 'EMR created successfully', emr });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllEMRs = async (req, res) => {
  try {
    const emrs = await EMR.find()
      .populate('patientId')
      .populate('doctorId');
    res.status(200).json(emrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getEMRById = async (req, res) => {
  try {
    const emr = await EMR.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId');
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
      .populate('patientId')
      .populate('doctorId');
    res.status(200).json(emrs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateEMR = async (req, res) => {
  try {
    const emr = await EMR.findByIdAndUpdate(req.params.id, req.body, { new: true });
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