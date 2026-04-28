const express = require('express');
const router = express.Router();
const { addMedicine, getAllMedicines, getMedicineById, getLowStockMedicines, updateMedicine, deleteMedicine } = require('../controllers/pharmacyController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin', 'pharmacist'), addMedicine);
router.get('/', authorize('admin', 'pharmacist', 'doctor', 'nurse'), getAllMedicines);
router.get('/lowstock', authorize('admin', 'pharmacist'), getLowStockMedicines);
router.get('/:id', authorize('admin', 'pharmacist', 'doctor', 'nurse'), getMedicineById);
router.put('/:id', authorize('admin', 'pharmacist'), updateMedicine);
router.delete('/:id', authorize('admin'), deleteMedicine);

module.exports = router;