const express = require('express');
const router = express.Router();
const { addBed, getAllBeds, getAvailableBeds, updateBed, deleteBed } = require('../controllers/bedController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addBed);
router.get('/', protect, getAllBeds);
router.get('/available', protect, getAvailableBeds);
router.put('/:id', protect, updateBed);
router.delete('/:id', protect, deleteBed);

module.exports = router;