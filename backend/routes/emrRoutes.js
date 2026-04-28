const express = require('express');
const router = express.Router();
const { addEMR, getAllEMRs, getEMRById, getEMRByPatient, updateEMR, deleteEMR } = require('../controllers/emrController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('doctor'), addEMR);
router.get('/', authorize('admin', 'doctor', 'nurse'), getAllEMRs);
router.get('/:id', authorize('admin', 'doctor', 'nurse', 'patient'), getEMRById);
router.get('/patient/:patientId', authorize('admin', 'doctor', 'nurse', 'patient'), getEMRByPatient);
router.put('/:id', authorize('doctor'), updateEMR);
router.delete('/:id', authorize('admin'), deleteEMR);

module.exports = router;