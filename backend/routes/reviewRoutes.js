const express = require('express');
const router = express.Router();
const {
  addReview,
  getAllReviews,
  getReviewById,
  getReviewsByStaff,
  getStaffAverageRating,
  getReviewsByDoctor,
  getDoctorAverageRating,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');

const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('patient', 'admin', 'receptionist'), addReview);
router.get('/', authorize('admin', 'receptionist', 'doctor', 'patient'), getAllReviews);

// ✅ Specific routes BEFORE param routes
router.get('/staff/:staffId/rating', authorize('admin', 'receptionist', 'doctor', 'patient'), getStaffAverageRating);
router.get('/staff/:staffId', authorize('admin', 'receptionist', 'doctor', 'patient'), getReviewsByStaff);

router.get('/doctor/:doctorId/rating', authorize('admin', 'receptionist', 'doctor', 'patient'), getDoctorAverageRating);
router.get('/doctor/:doctorId', authorize('admin', 'receptionist', 'doctor', 'patient'), getReviewsByDoctor);

// ✅ Param routes AFTER
router.get('/:id', authorize('admin', 'receptionist', 'doctor', 'patient'), getReviewById);
router.put('/:id', authorize('admin', 'patient'), updateReview);
router.delete('/:id', authorize('admin', 'patient'), deleteReview);

module.exports = router;