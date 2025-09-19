# Prescripto Admin Dashboard

## Overview
Prescripto Admin Dashboard is a comprehensive web application designed to manage and oversee the Prescripto healthcare platform. It provides administrators with powerful tools to manage doctors, users, appointments, and other platform operations.

## Tech Stack

### Frontend Technologies
- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend build tool for fast development
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router**: Declarative routing for React applications
- **Axios**: Promise-based HTTP client for making API requests
- **React Toastify**: Notification component for React

### Development Tools
- **ESLint**: Pluggable JavaScript linter
- **TypeScript Support**: Type definitions for React and React DOM
- **Vite React Plugin**: Fast Refresh support for React

## Project Structure

```
admin/
├── public/
│   └── vite.svg          # Default Vite SVG
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── context/          # React context for state management
│   │   └── DoctorContext.jsx  # Context for doctor-related data
│   ├── pages/            # Application pages
│   │   └── Doctor/       # Doctor-related pages
│   │       └── DoctorProfile.jsx  # Doctor profile management
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package-lock.json
├── package.json          # Project dependencies and scripts
└── vite.config.js        # Vite configuration
```

## Key Features

### Core Functionality
- **Doctor Management**: Add, edit, and remove doctor profiles
- **User Management**: Oversee patient accounts and access
- **Appointment Oversight**: Monitor and manage all appointments
- **Platform Configuration**: Adjust system settings and preferences

### UI/UX Features
- Responsive design compatible with various screen sizes
- Intuitive dashboard interface for efficient management
- Real-time notifications for important events
- Smooth transitions and animations for enhanced user experience

## State Management
- React Context API for managing global state
- Local state management for component-specific data
- API integration for data persistence and retrieval

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- Backend server running (see backend README)

### Steps

1. Clone the repository
2. Navigate to the admin directory
   ```bash
   cd admin
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Start the development server
   ```bash
   npm run dev
   ```
5. For production build
   ```bash
   npm run build
   npm run preview
   ```

## API Integration
- Seamless integration with the Prescripto backend API
- Axios for handling HTTP requests and responses
- Error handling and data validation

## Development Guidelines

### Code Style
- Follow ESLint rules for consistent code quality
- Use Tailwind CSS for styling components
- Implement responsive design principles

### Component Structure
- Reusable components for common UI elements
- Page components for different sections of the dashboard
- Context providers for state management

## License
[ISC](https://opensource.org/licenses/ISC)
