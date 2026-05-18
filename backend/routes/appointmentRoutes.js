const express = require('express');
const router = express.Router();
const {
  addAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

const { protect }   = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

// Patient + receptionist/admin can book
router.post('/', authorize('patient', 'receptionist', 'admin'), addAppointment);

// ALL roles fetch their own filtered view (controller applies the filter)
router.get('/',    authorize('patient', 'doctor', 'receptionist', 'admin'), getAllAppointments);
router.get('/:id', authorize('patient', 'doctor', 'receptionist', 'admin'), getAppointmentById);

// Patient (reschedule own), receptionist, admin can update — controller blocks cross-ownership
router.put('/:id', authorize('patient', 'receptionist', 'admin'), updateAppointment);

// Patient (cancel own) + admin/receptionist can delete — controller blocks doctors
router.delete('/:id', authorize('patient', 'receptionist', 'admin'), deleteAppointment);

module.exports = router;