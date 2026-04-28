const Review = require('../models/Review');
const Staff = require('../models/Staff');

// Add new review
const addReview = async (req, res) => {
  try {
    const { staffId, patientId, rating, comment, category, isAnonymous } = req.body;

    const staffExists = await Staff.findById(staffId);
    if (!staffExists) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    const review = await Review.create({
      staffId,
      reviewerId: req.user.id,
      patientId,
      rating,
      comment,
      category,
      isAnonymous
    });

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('staffId', 'position specialization')
      .populate('reviewerId', 'name email')
      .populate('patientId', 'emergencyContact');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get review by ID
const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('staffId', 'position specialization')
      .populate('reviewerId', 'name email')
      .populate('patientId', 'emergencyContact');
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for specific staff
const getReviewsByStaff = async (req, res) => {
  try {
    const reviews = await Review.find({ staffId: req.params.staffId })
      .populate('staffId', 'position specialization')
      .populate('reviewerId', 'name email');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get average rating for staff
const getStaffAverageRating = async (req, res) => {
  try {
    const staffId = req.params.staffId;
    const reviews = await Review.find({ staffId });
    
    if (reviews.length === 0) {
      return res.status(200).json({ averageRating: 0, totalReviews: 0 });
    }

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / reviews.length).toFixed(2);

    res.status(200).json({ 
      staffId,
      averageRating: parseFloat(averageRating),
      totalReviews: reviews.length 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update review
const updateReview = async (req, res) => {
  try {
    const { rating, comment, category } = req.body;

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      {
        rating,
        comment,
        category,
        updatedAt: Date.now()
      },
      { new: true }
    )
      .populate('staffId', 'position specialization')
      .populate('reviewerId', 'name email');

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    res.status(200).json({ message: 'Review updated successfully', review });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addReview,
  getAllReviews,
  getReviewById,
  getReviewsByStaff,
  getStaffAverageRating,
  updateReview,
  deleteReview
};
