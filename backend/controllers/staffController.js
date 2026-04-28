const Staff = require('../models/Staff');
const User = require('../models/User');

// Add new staff
const addStaff = async (req, res) => {
  try {
    const { userId, department, position, specialization, experience, licenseNumber, qualifications, contactNumber, address } = req.body;

    const staffExists = await Staff.findOne({ userId });
    if (staffExists) {
      return res.status(400).json({ message: 'Staff member already exists' });
    }

    const staff = await Staff.create({
      userId,
      department,
      position,
      specialization,
      experience,
      licenseNumber,
      qualifications,
      contactNumber,
      address
    });

    res.status(201).json({ message: 'Staff added successfully', staff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all staff
const getAllStaff = async (req, res) => {
  try {
    const staff = await Staff.find()
      .populate('userId', 'name email')
      .populate('department', 'name');
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get staff by ID
const getStaffById = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate('userId', 'name email')
      .populate('department', 'name');
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get staff by department
const getStaffByDepartment = async (req, res) => {
  try {
    const staff = await Staff.find({ department: req.params.departmentId })
      .populate('userId', 'name email')
      .populate('department', 'name');
    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update staff
const updateStaff = async (req, res) => {
  try {
    const { position, specialization, experience, licenseNumber, licenseExpiry, qualifications, status, contactNumber, address } = req.body;

    const staff = await Staff.findByIdAndUpdate(
      req.params.id,
      {
        position,
        specialization,
        experience,
        licenseNumber,
        licenseExpiry,
        qualifications,
        status,
        contactNumber,
        address,
        updatedAt: Date.now()
      },
      { new: true }
    )
      .populate('userId', 'name email')
      .populate('department', 'name');

    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }

    res.status(200).json({ message: 'Staff updated successfully', staff });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete staff
const deleteStaff = async (req, res) => {
  try {
    const staff = await Staff.findByIdAndDelete(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: 'Staff not found' });
    }
    res.status(200).json({ message: 'Staff deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addStaff,
  getAllStaff,
  getStaffById,
  getStaffByDepartment,
  updateStaff,
  deleteStaff
};
