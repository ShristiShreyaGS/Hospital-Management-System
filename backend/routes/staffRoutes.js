const express = require('express');
const router = express.Router();
const {
  addStaff,
  getAllStaff,
  getStaffById,
  getStaffByDepartment,
  updateStaff,
  deleteStaff
} = require('../controllers/staffController');

const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin'), addStaff);
router.get('/', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), getAllStaff);
router.get('/:id', authorize('admin', 'receptionist', 'doctor', 'nurse', 'patient'), getStaffById);
router.get('/department/:departmentId', authorize('admin', 'receptionist'), getStaffByDepartment);
router.put('/:id', authorize('admin', 'receptionist', 'nurse', 'lab_staff', 'pharmacist'), updateStaff);
router.delete('/:id', authorize('admin'), deleteStaff);

module.exports = router;
