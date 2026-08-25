const express = require('express');
const router = express.Router();
const { createPrescription, getPrescriptions, getPrescriptionById } = require('../controllers/prescriptionController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('doctor'), createPrescription);
router.get('/', authorize('doctor','patient','admin','pharmacist','nurse','lab_staff','receptionist'), getPrescriptions);
router.get('/:id', authorize('doctor','patient','admin','pharmacist','nurse','lab_staff','receptionist'), getPrescriptionById);

module.exports = router;
