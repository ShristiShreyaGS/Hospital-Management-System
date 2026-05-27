const express = require('express');
const router = express.Router();
const { addBed, getAllBeds, getAvailableBeds, updateBed, deleteBed } = require('../controllers/bedController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin'), addBed);
router.get('/available', authorize('admin', 'receptionist', 'nurse'), getAvailableBeds);
router.get('/', authorize('admin', 'receptionist', 'nurse', 'doctor'), getAllBeds);
router.put('/:id', authorize('admin', 'receptionist'), updateBed);
router.delete('/:id', authorize('admin'), deleteBed);

module.exports = router;