# Prescripto Backend

## Overview
Prescripto Backend is the server-side component of the Prescripto healthcare platform. It provides RESTful API endpoints to support doctor-patient interactions, appointment management, and administrative functions for healthcare service providers.

## Tech Stack

### Core Technologies
- **Node.js**: JavaScript runtime for server-side development
- **Express**: Web framework for building RESTful APIs
- **MongoDB**: NoSQL database for storing application data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB

### Additional Libraries
- **Cloudinary**: Cloud-based image storage and management
- **JWT (jsonwebtoken)**: For user authentication and authorization
- **bcrypt**: For secure password hashing
- **Multer**: For handling multipart/form-data, primarily for file uploads
- **Razorpay**: Payment gateway integration
- **CORS**: Cross-Origin Resource Sharing middleware
- **dotenv**: Environment variable management
- **validator**: Data validation
- **nodemon**: Development tool that automatically restarts the server

## Project Structure

```
backend/
├── config/
│   ├── cloudinary.js   # Cloudinary configuration
│   └── mongodb.js      # MongoDB connection setup
├── controllers/
│   ├── adminController.js  # Admin-related business logic
│   ├── doctorController.js # Doctor-related business logic
│   └── userController.js   # User-related business logic
├── middlewares/
│   ├── authAdmin.js    # Admin authentication middleware
│   ├── authDoctor.js   # Doctor authentication middleware
│   ├── authUser.js     # User authentication middleware
│   └── multer.js       # File upload configuration
├── models/
│   ├── appointmentModels.js  # Appointment schema
│   ├── doctorModel.js        # Doctor schema
│   └── userModel.js          # User schema
├── routes/
│   ├── adminRoute.js   # Admin API routes
│   ├── doctorRoute.js  # Doctor API routes
│   └── userRoute.js    # User API routes
├── package-lock.json
├── package.json
└── server.js           # Server entry point
```

## Database Models

### Doctor Model
- **name**: String (required)
- **email**: String (required, unique)
- **password**: String (required)
- **image**: String (required)
- **speciality**: String (required)
- **degree**: String (required)
- **experience**: String (required)
- **about**: String (required)
- **available**: Boolean (default: true)

### User Model
- Contains patient information for booking appointments

### Appointment Model
- Contains appointment details between patients and doctors

## API Endpoints

### Admin Routes
- Base URL: `/api/admin`
- Key endpoints: Adding doctors, managing platform users, etc.

### Doctor Routes
- Base URL: `/api/doctor`
- Key endpoints: Profile management, appointment scheduling, availability toggling, etc.

### User Routes
- Base URL: `/api/user`
- Key endpoints: Registration, appointment booking, profile management, etc.

## Authentication & Authorization
- JWT-based authentication for secure API access
- Role-based authorization (Admin, Doctor, User)
- Password encryption using bcrypt

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB account
- Cloudinary account
- Razorpay account (for payment integration)

### Steps

1. Clone the repository
2. Navigate to the backend directory
   ```bash
   cd backend
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Create a `.env` file and add the following environment variables:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret_key
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```
5. Start the development server
   ```bash
   npm run server
   ```
6. For production environment
   ```bash
   npm start
   ```

## Features
- Secure user authentication and authorization
- Doctor profile management
- Appointment booking system
- Payment integration via Razorpay
- Image uploads to Cloudinary
- Responsive API design for both web and mobile clients
- Error handling and validation

## License
[ISC](https://opensource.org/licenses/ISC)