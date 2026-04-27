require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

connectDB();

const app = express();
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const patientRoutes = require('./routes/patientRoutes');
app.use('/api/patients', patientRoutes);

const doctorRoutes = require('./routes/doctorRoutes');
app.use('/api/doctors', doctorRoutes);

const departmentRoutes = require('./routes/departmentRoutes');
app.use('/api/departments', departmentRoutes);

const billRoutes = require('./routes/billRoutes');
app.use('/api/bills', billRoutes);

const appointmentRoutes = require('./routes/appointmentRoutes');
app.use('/api/appointments', appointmentRoutes);

const addmissionRoutes = require('./routes/addmissionRoutes');
app.use('/api/admissions', addmissionRoutes);

const bedRoutes = require('./routes/bedRoutes');
app.use('/api/beds', bedRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'HMS API is running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});