const express = require('express');
const router = express.Router();
const { 
    addAppointment, 
    getAllAppointments, 
    getAppointmentById, 
    updateAppointment, 
    deleteAppointment 
} = require('../controllers/appointmentController');

const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('patient', 'receptionist'), addAppointment);

router.get('/', authorize('admin', 'receptionist', 'doctor'), getAllAppointments);
router.get('/:id', authorize('admin', 'receptionist', 'doctor', 'patient'), getAppointmentById);

router.put('/:id', authorize('doctor'), updateAppointment);
router.delete('/:id', authorize('admin'), deleteAppointment);

module.exports = router;