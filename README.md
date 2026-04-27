# Hospital Management System (HMS)

## Tech Stack

### Frontend
- React - UI components
- Redux - Global state management
- React Router - Client-side routing
- Axios - API calls
- Formik + Yup - Form handling and validation
- Recharts - Reports and analytics

### Backend
- Node.js + Express - REST API server
- MongoDB - Database
- JWT - Authentication
- Multer / Cloudinary - File uploads

---

## Folder Structure

### Backend
backend/
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── .env
├── package.json
└── server.js

### Frontend
client/src/
├── assets/
├── components/
├── features/
├── pages/
├── routes/
├── services/
└── utils/

---

## Database Schema (MVP)

### users
- name
- username
- email
- password
- role (admin/doctor/patient/receptionist/nurse/lab_staff/pharmacist)
- dateOfJoining
- isActive

### patients
- userId (reference to users)
- age
- previousRecords
- emergencyContact
- contactNumber
- currentHealthStatus

### doctors
- userId (reference to users)
- specialization
- degree
- yearsOfExperience
- successRate
- workingDays
- workingHours
- consultationFee

### appointments
- patientId (reference to patients)
- doctorId (reference to doctors)
- appointmentDate
- appointmentTime
- status (Scheduled/Completed/Cancelled/No Show)
- reason

### bills
- patientId (reference to patients)
- doctorId (reference to doctors)
- amount
- paymentMode (cash/card/UPI)
- paymentStatus (paid/unpaid/partial)
- paymentDate
- items[]

### departments
- name
- description
- location
- totalStaff
- headDoctorId (reference to doctors)

---

## API Routes (MVP)

### Auth
POST   /api/auth/register
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/forgot-password

### Patients
POST   /api/patients
GET    /api/patients
GET    /api/patients/:id
PUT    /api/patients/:id
DELETE /api/patients/:id

### Doctors
POST   /api/doctors
GET    /api/doctors
GET    /api/doctors/:id
PUT    /api/doctors/:id
DELETE /api/doctors/:id

### Appointments
POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/:id
PUT    /api/appointments/:id
DELETE /api/appointments/:id

### Bills
POST   /api/bills
GET    /api/bills
GET    /api/bills/:id
PUT    /api/bills/:id
DELETE /api/bills/:id

### Departments
POST   /api/departments
GET    /api/departments
GET    /api/departments/:id
PUT    /api/departments/:id
DELETE /api/departments/:id

---

## Phase 2 Progress

### Models Complete
User.js
Patient.js
Doctor.js
Appointment.js
Bill.js
Department.js

### Routes & Controllers Complete
✅ authController.js (register, login)
✅ authRoutes.js
✅ Tested register API - working
✅ Tested login API - working (returns JWT token)