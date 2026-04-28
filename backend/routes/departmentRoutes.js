const express = require('express');
const router = express.Router();
const { 
    addDepartment, 
    getAllDepartments, 
    getDepartmentById, 
    updateDepartment, 
    deleteDepartment 
} = require('../controllers/departmentController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.use(protect);

router.post('/', authorize('admin'), addDepartment);
router.get('/', authorize('admin'), getAllDepartments);
router.get('/:id', authorize('admin'), getDepartmentById);
router.put('/:id', authorize('admin'), updateDepartment);
router.delete('/:id', authorize('admin'), deleteDepartment);

module.exports = router;