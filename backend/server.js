require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

connectDB();

const app = express();

// Dynamic CORS configuration to handle all Vercel deployments
const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:3000',
  'https://hospital-management-system-sigma-three.vercel.app'
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Allow if in whitelist
    if (allowedOrigins.includes(origin)) return callback(null, true);
    
    // Allow all Vercel preview deployments
    if (origin.includes('.vercel.app')) return callback(null, true);
    
    // Otherwise, deny
    const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
    return callback(new Error(msg), false);
  },
  credentials: true,
}));

app.use(express.json());

const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

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

 const emrRoutes = require('./routes/emrRoutes');
app.use('/api/emrs', emrRoutes);

 const labRoutes = require('./routes/labRoutes');
 app.use('/api/labs', labRoutes);

 const pharmacyRoutes = require('./routes/pharmacyRoutes');
 app.use('/api/pharmacy', pharmacyRoutes);

 const staffRoutes = require('./routes/staffRoutes');
 app.use('/api/staff', staffRoutes);

const reviewRoutes = require('./routes/reviewRoutes');
app.use('/api/reviews', reviewRoutes);

// const notificationRoutes = require('./routes/notificationRoutes');
//  app.use('/api/notifications', notificationRoutes);
 
const notificationRoutes = require('./routes/notificationRoutes');
app.use('/api/notifications', notificationRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'HMS API is running...' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

