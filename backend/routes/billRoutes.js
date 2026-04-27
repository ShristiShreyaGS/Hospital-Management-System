const express = require('express');
const router = express.Router();
const { addBill, getAllBills, getBillById, updateBill, deleteBill } = require('../controllers/billController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addBill);
router.get('/', protect, getAllBills);
router.get('/:id', protect, getBillById);
router.put('/:id', protect, updateBill);
router.delete('/:id', protect, deleteBill);

module.exports = router;