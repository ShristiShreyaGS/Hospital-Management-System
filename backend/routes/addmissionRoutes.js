const express = require('express');
const router = express.Router();
const { 
    admitPatient, 
    dischargePatient, 
    getAllAdmissions, 
    getAdmissionById 
} = require('../controllers/admissionController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('receptionist', 'nurse'), admitPatient);
router.put('/:id', authorize('doctor', 'nurse'), dischargePatient);
router.get('/', authorize('admin', 'receptionist', 'doctor', 'nurse'), getAllAdmissions);
router.get('/:id', authorize('admin', 'receptionist', 'doctor', 'nurse'), getAdmissionById);

module.exports = router;