const express = require('express');
const router = express.Router();
const { orderLabTest, getAllLabTests, getLabTestById, getLabTestsByPatient, updateLabTest, deleteLabTest } = require('../controllers/labController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('doctor'), orderLabTest);
router.get('/', authorize('admin', 'doctor', 'lab_staff', 'nurse'), getAllLabTests);
router.get('/:id', authorize('admin', 'doctor', 'lab_staff', 'nurse', 'patient'), getLabTestById);
router.get('/patient/:patientId', authorize('admin', 'doctor', 'lab_staff', 'patient'), getLabTestsByPatient);
router.put('/:id', authorize('lab_staff', 'doctor'), updateLabTest);
router.delete('/:id', authorize('admin'), deleteLabTest);

module.exports = router;