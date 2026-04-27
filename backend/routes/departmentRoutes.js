const express = require('express');
const router = express.Router();
const { addDepartment, getAllDepartments, getDepartmentById, updateDepartment, deleteDepartment } = require('../controllers/departmentController');
const { protect } = require('../middlewares/authMiddleware');

router.post('/', protect, addDepartment);
router.get('/', protect, getAllDepartments);
router.get('/:id', protect, getDepartmentById);
router.put('/:id', protect, updateDepartment);
router.delete('/:id', protect, deleteDepartment);

module.exports = router;