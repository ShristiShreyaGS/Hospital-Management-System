const express = require('express')
const router = express.Router()
const { createOrder, verifyPayment } = require('../controllers/paymentController')
const { protect } = require('../middlewares/authMiddleware')
const { authorize } = require('../middlewares/roleMiddleware')

router.use(protect)

router.post('/create-order', authorize('patient', 'receptionist', 'admin'), createOrder)
router.post('/verify', authorize('patient', 'receptionist', 'admin'), verifyPayment)

module.exports = router