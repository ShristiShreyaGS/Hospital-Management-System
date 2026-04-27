const express = require('express');
const router = express.Router();
const { addPatient, getAllPatients, getPatientById, updatePatient, deletePatient } = require('../controllers/patientController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addPatient);
router.get('/', protect, getAllPatients);
router.get('/:id', protect, getPatientById);
router.put('/:id', protect, updatePatient);
router.delete('/:id', protect, deletePatient);

module.exports = router;