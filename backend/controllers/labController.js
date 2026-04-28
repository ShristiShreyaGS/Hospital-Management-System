const Lab = require('../models/Lab');

const orderLabTest = async (req, res) => {
  try {
    const { patientId, doctorId, testName } = req.body;

    const lab = await Lab.create({
      patientId, doctorId, testName
    });

    res.status(201).json({ message: 'Lab test ordered successfully', lab });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllLabTests = async (req, res) => {
  try {
    const labs = await Lab.find()
      .populate('patientId')
      .populate('doctorId');
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabTestById = async (req, res) => {
  try {
    const lab = await Lab.findById(req.params.id)
      .populate('patientId')
      .populate('doctorId');
    if (!lab) {
      return res.status(404).json({ message: 'Lab test not found' });
    }
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getLabTestsByPatient = async (req, res) => {
  try {
    const labs = await Lab.find({ patientId: req.params.patientId })
      .populate('patientId')
      .populate('doctorId');
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateLabTest = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!lab) {
      return res.status(404).json({ message: 'Lab test not found' });
    }
    res.status(200).json({ message: 'Lab test updated successfully', lab });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteLabTest = async (req, res) => {
  try {
    const lab = await Lab.findByIdAndDelete(req.params.id);
    if (!lab) {
      return res.status(404).json({ message: 'Lab test not found' });
    }
    res.status(200).json({ message: 'Lab test deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { orderLabTest, getAllLabTests, getLabTestById, getLabTestsByPatient, updateLabTest, deleteLabTest };