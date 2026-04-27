const express = require('express');
const router = express.Router();
const { admitPatient, dischargePatient, getAllAdmissions, getAdmissionById } = require('../controllers/admissionController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, admitPatient);
router.put('/:id', protect, dischargePatient);
router.get('/', protect, getAllAdmissions);
router.get('/:id', protect, getAdmissionById);

module.exports = router;