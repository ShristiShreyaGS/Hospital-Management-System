const User = require('../models/User');
const Patient = require('../models/Patient');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { 
      name, username, email, password, role, phone,
      // Patient fields
      age, gender, bloodGroup, allergies, 
      address, contactNumber, emergencyContact, 
      currentHealthStatus 
    } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      username,
      email,
      password: hashedPassword,
      role: role || 'patient',
      phone,
    });

    // If role is patient, auto create patient profile
    if (user.role === 'patient') {
      await Patient.create({
        userId: user._id,
        age,
        gender,
        bloodGroup,
        allergies,
        address,
        contactNumber,
        emergencyContact,
        currentHealthStatus,
      })
    }

    res.status(201).json({ 
      message: 'User registered successfully', 
      userId: user._id 
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ 
      token, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        username: user.username
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { registerUser, loginUser };