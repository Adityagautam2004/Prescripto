# Prescripto Healthcare Platform

## Overview
Prescripto is a comprehensive healthcare platform designed to connect patients with doctors seamlessly. It provides a complete ecosystem for online medical consultations, appointment management, and healthcare service administration. The platform consists of three main components: Frontend (patient-facing), Admin Dashboard (administrative management), and Backend (API and business logic).

## Project Structure

```
Prescripto/
├── admin/          # Admin dashboard for platform management
├── backend/        # Server-side API and business logic
├── frontend/       # Patient-facing web application
└── README.md       # Project overview (this file)
```

## Components

### 1. Frontend
The patient-facing application that allows users to search for doctors, book appointments, manage their profiles, and view appointment history.

**Key Technologies:**
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

For detailed information, see the [Frontend README](frontend/README.md).

### 2. Admin Dashboard
A comprehensive interface for administrators to manage doctors, users, appointments, and platform settings.

**Key Technologies:**
- React
- Vite
- Tailwind CSS
- React Router
- Axios
- React Toastify

For detailed information, see the [Admin Dashboard README](admin/README.md).

### 3. Backend
The server-side component that powers the platform with RESTful APIs, database operations, authentication, and business logic.

**Key Technologies:**
- Node.js
- Express
- MongoDB
- Mongoose
- Cloudinary
- JWT (jsonwebtoken)
- bcrypt
- Multer
- Razorpay

For detailed information, see the [Backend README](backend/README.md).

## System Architecture

### Frontend Architecture
- React components with functional approach and hooks
- Context API for state management
- Responsive design with Tailwind CSS
- Client-side routing with React Router
- API communication with Axios

### Backend Architecture
- RESTful API design with Express.js
- MVC (Model-View-Controller) pattern
- MongoDB database with Mongoose ODM
- JWT-based authentication and authorization
- Middleware for request processing and error handling
- Cloud storage integration with Cloudinary
- Payment gateway integration with Razorpay

## Key Features

### Patient Features
- Doctor search by specialty, name, and availability
- Appointment booking and management
- User profile management
- Appointment history view
- Notifications for appointment confirmations and reminders

### Doctor Features
- Profile management
- Availability settings
- Appointment scheduling and management
- Patient consultation interface

### Admin Features
- Doctor management (add, edit, remove)
- User management
- Appointment oversight and management
- Platform configuration and settings

## Deployment

### Prerequisites
- Node.js (v16 or higher)
- MongoDB database
- Cloudinary account
- Razorpay account
- Web hosting service or cloud platform (AWS, Azure, GCP, etc.)

### Deployment Steps
1. **Backend Deployment**
   - Set up environment variables for production
   - Build and deploy the Node.js application
   - Configure the MongoDB connection
   - Set up Cloudinary and Razorpay integrations

2. **Frontend Deployment**
   - Build the React application for production
   - Deploy to a static hosting service or CDN
   - Configure API endpoints for the production backend

3. **Admin Dashboard Deployment**
   - Build the React application for production
   - Deploy to a secure hosting environment
   - Configure API endpoints for the production backend
   - Set up appropriate access controls

## Development Workflow

1. Clone the repository
2. Set up each component individually (see respective READMEs)
3. Start the backend server
4. Start the frontend and admin dashboard in development mode
5. Make changes and test locally
6. Commit changes to version control
7. Deploy to production environment

## License
[ISC](https://opensource.org/licenses/ISC)