# Hospital Management System (HMS) - Project Overview

This project is a full-stack hospital management application with:
- a Node.js + Express backend
- a React + Redux frontend
- MongoDB as the database
- JWT-based authentication and role-based access control

## 1. How the app is structured

### Backend
The backend handles API routes, authentication, business logic, and database access.

Main backend folders:
- [backend/server.js](backend/server.js) - app entry point
- [backend/config](backend/config) - database connection setup
- [backend/controllers](backend/controllers) - request handlers for each feature
- [backend/middlewares](backend/middlewares) - auth and role protection
- [backend/models](backend/models) - Mongoose schemas
- [backend/routes](backend/routes) - API route definitions
- [backend/utils](backend/utils) - helper utilities

### Frontend
The frontend is a React application with Redux state slices and role-based pages.

Main frontend folders:
- [client/src/main.jsx](client/src/main.jsx) - app bootstrap
- [client/src/App.jsx](client/src/App.jsx) - main route definitions
- [client/src/store.js](client/src/store.js) - Redux store setup
- [client/src/pages](client/src/pages) - screens/pages
- [client/src/features](client/src/features) - Redux slices and API logic
- [client/src/components](client/src/components) - reusable UI parts
- [client/src/routes](client/src/routes) - route guards

---

## 2. Backend file-by-file overview

### Entry and setup
- [backend/server.js](backend/server.js)
  - Starts the Express server
  - Enables CORS
  - Mounts all API route groups
  - Starts the app on port 5000 by default

- [backend/config/db.js](backend/config/db.js)
  - Connects the backend to MongoDB

### Authentication and permissions
- [backend/middlewares/authMiddleware.js](backend/middlewares/authMiddleware.js)
  - Verifies JWT tokens from the Authorization header
  - Attaches the decoded user to the request object

- [backend/middlewares/roleMiddleware.js](backend/middlewares/roleMiddleware.js)
  - Restricts access based on the logged-in user role

### Models (database schemas)
- [backend/models/User.js](backend/models/User.js)
  - Stores login credentials, role, and profile info for all users

- [backend/models/Patient.js](backend/models/Patient.js)
  - Stores patient profile details linked to a user

- [backend/models/Doctor.js](backend/models/Doctor.js)
  - Stores doctor-specific information such as specialization and fees

- [backend/models/Appointment.js](backend/models/Appointment.js)
  - Stores appointment bookings between patients and doctors

- [backend/models/Bill.js](backend/models/Bill.js)
  - Stores billing and payment information

- [backend/models/Department.js](backend/models/Department.js)
  - Stores department information

- [backend/models/Bed.js](backend/models/Bed.js)
  - Represents hospital beds and availability

- [backend/models/EMR.js](backend/models/EMR.js)
  - Stores electronic medical records

- [backend/models/Lab.js](backend/models/Lab.js)
  - Stores lab test records

- [backend/models/Pharmacy.js](backend/models/Pharmacy.js)
  - Stores pharmacy-related records

- [backend/models/Notification.js](backend/models/Notification.js)
  - Stores in-app or system notifications

- [backend/models/Review.js](backend/models/Review.js)
  - Stores reviews or feedback

- [backend/models/Staff.js](backend/models/Staff.js)
  - Stores staff-related data

- [backend/models/Admission.js](backend/models/Admission.js)
  - Stores admission-related records

- [backend/models/models.js](backend/models/models.js)
  - Aggregates or centralizes model definitions if used by the project

### Controllers (business logic)
- [backend/controllers/authController.js](backend/controllers/authController.js)
  - Handles registration, login, profile updates, and current-user lookup

- [backend/controllers/patientController.js](backend/controllers/patientController.js)
  - Handles patient profile creation, read, update, delete, and personal profile lookup

- [backend/controllers/doctorController.js](backend/controllers/doctorController.js)
  - Handles doctor CRUD operations and doctor-specific filtering

- [backend/controllers/appointmentController.js](backend/controllers/appointmentController.js)
  - Handles appointment creation and management

- [backend/controllers/billController.js](backend/controllers/billController.js)
  - Handles bills, payments, and payment statuses

- [backend/controllers/departmentController.js](backend/controllers/departmentController.js)
  - Handles department CRUD and search logic

- [backend/controllers/bedController.js](backend/controllers/bedController.js)
  - Handles bed management and status updates

- [backend/controllers/emrController.js](backend/controllers/emrController.js)
  - Handles EMR record CRUD and related operations

- [backend/controllers/labController.js](backend/controllers/labController.js)
  - Handles lab request and result operations

- [backend/controllers/pharmacyController.js](backend/controllers/pharmacyController.js)
  - Handles pharmacy inventory or medicine-related operations

- [backend/controllers/staffController.js](backend/controllers/staffController.js)
  - Handles staff management and staff profile operations

- [backend/controllers/notificationController.js](backend/controllers/notificationController.js)
  - Handles notification creation and retrieval

- [backend/controllers/reviewController.js](backend/controllers/reviewController.js)
  - Handles feedback or reviews

- [backend/controllers/admissionController.js](backend/controllers/admissionController.js)
  - Handles admission flow and related data

- [backend/controllers/paymentController.js](backend/controllers/paymentController.js)
  - Handles payment-related functionality

### Routes (API endpoints)
- [backend/routes/authRoutes.js](backend/routes/authRoutes.js)
  - Exposes authentication endpoints

- [backend/routes/patientRoutes.js](backend/routes/patientRoutes.js)
  - Exposes patient endpoints

- [backend/routes/doctorRoutes.js](backend/routes/doctorRoutes.js)
  - Exposes doctor endpoints

- [backend/routes/appointmentRoutes.js](backend/routes/appointmentRoutes.js)
  - Exposes appointment endpoints

- [backend/routes/billRoutes.js](backend/routes/billRoutes.js)
  - Exposes bill endpoints

- [backend/routes/departmentRoutes.js](backend/routes/departmentRoutes.js)
  - Exposes department endpoints

- [backend/routes/bedRoutes.js](backend/routes/bedRoutes.js)
  - Exposes bed endpoints

- [backend/routes/emrRoutes.js](backend/routes/emrRoutes.js)
  - Exposes EMR endpoints

- [backend/routes/labRoutes.js](backend/routes/labRoutes.js)
  - Exposes lab endpoints

- [backend/routes/pharmacyRoutes.js](backend/routes/pharmacyRoutes.js)
  - Exposes pharmacy endpoints

- [backend/routes/staffRoutes.js](backend/routes/staffRoutes.js)
  - Exposes staff endpoints

- [backend/routes/notificationRoutes.js](backend/routes/notificationRoutes.js)
  - Exposes notification endpoints

- [backend/routes/reviewRoutes.js](backend/routes/reviewRoutes.js)
  - Exposes review endpoints

- [backend/routes/addmissionRoutes.js](backend/routes/addmissionRoutes.js)
  - Exposes admission endpoints

- [backend/routes/paymentRoutes.js](backend/routes/paymentRoutes.js)
  - Exposes payment endpoints

### Utilities
- [backend/utils/notificationHelper.js](backend/utils/notificationHelper.js)
  - Helps with notification logic or formatting

---

## 3. Frontend file-by-file overview

### App bootstrap
- [client/src/main.jsx](client/src/main.jsx)
  - Creates the React root
  - Wraps the app with Redux Provider

- [client/src/App.jsx](client/src/App.jsx)
  - Defines the main route structure and access rules for pages

- [client/src/store.js](client/src/store.js)
  - Combines all Redux slices into one global store

### Route protection
- [client/src/routes/PrivateRoute.jsx](client/src/routes/PrivateRoute.jsx)
  - Redirects unauthenticated users to login

- [client/src/routes/RoleRoute.jsx](client/src/routes/RoleRoute.jsx)
  - Redirects users without the required role to an unauthorized page

- [client/src/routes/AppRoutes.jsx](client/src/routes/AppRoutes.jsx)
  - Alternative route setup file for routing logic

### Pages
These are the main screens the user sees.

- [client/src/pages/LoginPage.jsx](client/src/pages/LoginPage.jsx)
  - Login screen

- [client/src/pages/RegisterPage.jsx](client/src/pages/RegisterPage.jsx)
  - Registration screen

- [client/src/pages/DashboardPage.jsx](client/src/pages/DashboardPage.jsx)
  - Main dashboard entry point

- [client/src/pages/PatientsPage.jsx](client/src/pages/PatientsPage.jsx)
  - Patient management page

- [client/src/pages/DoctorsPage.jsx](client/src/pages/DoctorsPage.jsx)
  - Doctor management page

- [client/src/pages/AppointmentsPage.jsx](client/src/pages/AppointmentsPage.jsx)
  - Appointment dashboard and list page

- [client/src/pages/BillsPage.jsx](client/src/pages/BillsPage.jsx)
  - Billing page

- [client/src/pages/EMRPage.jsx](client/src/pages/EMRPage.jsx)
  - Electronic medical record UI

- [client/src/pages/LabPage.jsx](client/src/pages/LabPage.jsx)
  - Laboratory page

- [client/src/pages/PharmacyPage.jsx](client/src/pages/PharmacyPage.jsx)
  - Pharmacy page

- [client/src/pages/BedsPage.jsx](client/src/pages/BedsPage.jsx)
  - Bed management page

- [client/src/pages/AdmissionsPage.jsx](client/src/pages/AdmissionsPage.jsx)
  - Admission management page

- [client/src/pages/DepartmentsPage.jsx](client/src/pages/DepartmentsPage.jsx)
  - Department management page

- [client/src/pages/ProfilePage.jsx](client/src/pages/ProfilePage.jsx)
  - General profile page

- [client/src/pages/PatientProfilePage.jsx](client/src/pages/PatientProfilePage.jsx)
  - Patient-specific profile view

- [client/src/pages/DoctorProfilePage.jsx](client/src/pages/DoctorProfilePage.jsx)
  - Doctor-specific profile view

- [client/src/pages/StaffProfilePage.jsx](client/src/pages/StaffProfilePage.jsx)
  - Staff-specific profile view

- [client/src/pages/ReviewsPage.jsx](client/src/pages/ReviewsPage.jsx)
  - Review or feedback page

- [client/src/pages/NotificationsPage.jsx](client/src/pages/NotificationsPage.jsx)
  - Notification center UI

- [client/src/pages/UnauthorizedPage.jsx](client/src/pages/UnauthorizedPage.jsx)
  - Shown when a user lacks access

### Redux slices
These files connect the frontend to the backend and manage state.

- [client/src/features/auth/authSlice.js](client/src/features/auth/authSlice.js)
  - Manages login, register, logout, and current user state

- [client/src/features/patients/patientSlice.js](client/src/features/patients/patientSlice.js)
  - Manages patient data in Redux

- [client/src/features/doctors/doctorSlice.js](client/src/features/doctors/doctorSlice.js)
  - Manages doctor data in Redux

- [client/src/features/appointments/appointmentSlice.js](client/src/features/appointments/appointmentSlice.js)
  - Manages appointments state

- [client/src/features/bills/billSlice.js](client/src/features/bills/billSlice.js)
  - Manages billing data state

- [client/src/features/departments/departmentSlice.js](client/src/features/departments/departmentSlice.js)
  - Manages department state

- [client/src/features/emr/emrSlice.js](client/src/features/emr/emrSlice.js)
  - Manages EMR state

- [client/src/features/lab/labSlice.js](client/src/features/lab/labSlice.js)
  - Manages lab state

- [client/src/features/pharmacy/pharmacySlice.js](client/src/features/pharmacy/pharmacySlice.js)
  - Manages pharmacy state

- [client/src/features/admissions/admissionSlice.js](client/src/features/admissions/admissionSlice.js)
  - Manages admission state

- [client/src/features/beds/bedSlice.js](client/src/features/beds/bedSlice.js)
  - Manages bed state

- [client/src/features/reviews/reviewSlice.js](client/src/features/reviews/reviewSlice.js)
  - Manages review state

- [client/src/features/notifications/notificationSlice.js](client/src/features/notifications/notificationSlice.js)
  - Manages notifications state

- [client/src/features/staff/staffSlice.js](client/src/features/staff/staffSlice.js)
  - Manages staff state

### UI components
The components folder contains reusable pieces used by the pages.

Examples include:
- [client/src/components/Navbar.jsx](client/src/components/Navbar.jsx)
  - Main top navigation bar

- [client/src/components/patients/PatientList.jsx](client/src/components/patients/PatientList.jsx)
  - UI list for patients

- [client/src/components/doctors/DoctorList.jsx](client/src/components/doctors/DoctorList.jsx)
  - UI list for doctors

- [client/src/components/appointments/AppointmentList.jsx](client/src/components/appointments/AppointmentList.jsx)
  - Appointment list UI

- [client/src/components/bills/BillList.jsx](client/src/components/bills/BillList.jsx)
  - Bill list UI

- [client/src/components/dashboards/AdminDashboard.jsx](client/src/components/dashboards/AdminDashboard.jsx)
  - Admin dashboard view

- [client/src/components/dashboards/DoctorDashboard.jsx](client/src/components/dashboards/DoctorDashboard.jsx)
  - Doctor dashboard view

- [client/src/components/dashboards/PatientDashboard.jsx](client/src/components/dashboards/PatientDashboard.jsx)
  - Patient dashboard view

- [client/src/components/notifications/NotificationBell.jsx](client/src/components/notifications/NotificationBell.jsx)
  - Notification UI element

---

## 4. How data flows in this project

A typical request follows this path:
1. The user clicks a UI element in a page.
2. The page uses a component and dispatches an action from a Redux slice.
3. The Redux slice sends an HTTP request to the backend.
4. The backend route forwards the request to a controller.
5. The controller reads or writes data through a Mongoose model.
6. The response comes back to the frontend and updates Redux state.

Example:
- Login page -> auth slice -> POST /api/auth/login -> authController -> User model

---

## 5. Best way to explore it with Claude

Ask Claude to explain the project in this order:
1. Start with the backend architecture
2. Then explain the frontend architecture
3. Then explain one feature end-to-end
4. Then suggest a small change or improvement

### Good prompt for Claude
Use this prompt:

"Explain this repository like I am a beginner. Start with the overall architecture, then explain the backend folders and files, then the frontend folders and files, then describe how a simple feature like login or patient management works end-to-end. Also point out the most important files I should read first."

### Another useful prompt
"Read the project structure and tell me which files are the entry points, which files handle authentication, which files handle role-based access, and which files are most important for modifying the patient workflow."

---

## 6. Recommended reading order

If you want to understand the project quickly, read in this order:
1. [README.md](README.md)
2. [backend/server.js](backend/server.js)
3. [backend/controllers/authController.js](backend/controllers/authController.js)
4. [backend/middlewares/authMiddleware.js](backend/middlewares/authMiddleware.js)
5. [backend/routes/patientRoutes.js](backend/routes/patientRoutes.js)
6. [backend/controllers/patientController.js](backend/controllers/patientController.js)
7. [client/src/main.jsx](client/src/main.jsx)
8. [client/src/App.jsx](client/src/App.jsx)
9. [client/src/store.js](client/src/store.js)
10. [client/src/features/auth/authSlice.js](client/src/features/auth/authSlice.js)
11. [client/src/pages/LoginPage.jsx](client/src/pages/LoginPage.jsx)
12. [client/src/pages/DashboardPage.jsx](client/src/pages/DashboardPage.jsx)

---

## 7. Simple mental model

Think of the project like this:
- Backend = the hospital operations engine
- Frontend = the dashboard and screens used by staff/patients
- Redux = the app memory for current data
- MongoDB = the persistent hospital database
- JWT = the login/session system

If you want, I can next generate a feature-by-feature walkthrough for the most important modules such as authentication, patients, appointments, billing, and staff management.
