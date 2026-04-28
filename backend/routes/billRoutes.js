const express = require('express');
const router = express.Router();
const { 
    addBill, 
    getAllBills, 
    getBillById, 
    updateBill, 
    deleteBill 
} = require('../controllers/billController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin', 'receptionist'), addBill);
router.get('/', authorize('admin', 'receptionist'), getAllBills);
router.get('/:id', authorize('admin', 'receptionist'), getBillById);
router.put('/:id', authorize('admin', 'receptionist'), updateBill);
router.delete('/:id', authorize('admin'), deleteBill);

module.exports = router;