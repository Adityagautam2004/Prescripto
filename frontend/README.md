# Prescripto Frontend

## Overview
Prescripto Frontend is the patient-facing application of the Prescripto healthcare platform. It provides users with an intuitive interface to browse doctors, book appointments, manage their healthcare profiles, and access medical services conveniently.

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
frontend/
├── public/
│   └── vite.svg          # Default Vite SVG
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable UI components
│   ├── context/          # React context for state management
│   ├── pages/            # Application pages
│   ├── App.jsx           # Main application component
│   ├── index.css         # Global styles
│   └── main.jsx          # Entry point
├── .gitignore
├── eslint.config.js      # ESLint configuration
├── index.html            # HTML template
├── package-lock.json
├── package.json          # Project dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── vite.config.js        # Vite configuration
```

## Key Features

### Core Functionality
- **Doctor Search**: Browse and search for doctors by specialty, name, or availability
- **Appointment Booking**: Schedule, reschedule, or cancel appointments with doctors
- **User Profile Management**: Update personal information and medical history
- **Appointment History**: View past and upcoming appointments

### UI/UX Features
- Responsive design for seamless experience across devices
- Intuitive and user-friendly interface
- Real-time notifications for appointment confirmations and reminders
- Smooth animations and transitions

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
2. Navigate to the frontend directory
   ```bash
   cd frontend
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
- Error handling and form validation

## Development Guidelines

### Code Style
- Follow ESLint rules for consistent code quality
- Use Tailwind CSS for styling components
- Implement responsive design principles

### Component Structure
- Reusable components for common UI elements
- Page components for different sections of the application
- Context providers for state management

## License
[ISC](https://opensource.org/licenses/ISC)
