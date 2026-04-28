const express = require('express');
const router = express.Router();
const { 
    addPatient, 
    getAllPatients, 
    getPatientById, 
    updatePatient, 
    deletePatient 
} = require('../controllers/patientController');

const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);
router.post('/', authorize('admin', 'receptionist'), addPatient);
router.get('/', authorize('admin', 'receptionist', 'doctor', 'nurse'), getAllPatients);
router.get('/:id', authorize('admin', 'receptionist', 'doctor', 'nurse'), getPatientById);
router.put('/:id', authorize('doctor', 'nurse'), updatePatient);
router.delete('/:id', authorize('admin'), deletePatient);

module.exports = router;