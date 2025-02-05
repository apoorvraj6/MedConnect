# MedConnect - Doctor Appointment Booking System

## Overview
MedConnect is a full-stack doctor appointment booking system that allows users to book appointments with doctors, manage profiles, and streamline medical consultations.

## Features
- **User Authentication** (JWT-based authentication for secure login)
- **Doctor Management** (Doctors can register and manage their profiles)
- **Appointment Booking** (Users can schedule and manage appointments)
- **Payment Integration** (Razorpay for secure payments)
- **Cloud Storage** (Cloudinary for image uploads)
- **Admin Panel** (Admins can manage users, doctors, and appointments)
- **Mobile Responsive UI** (Built using React with Tailwind CSS)

## Tech Stack
### Frontend:
- React.js
- React Router
- Tailwind CSS
- Axios
- React Toastify

### Backend:
- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer (for file uploads)
- Cloudinary (for image storage)
- Razorpay (for payment processing)

## Project Structure
```
MedConnect/
├── Client/  # Frontend Code
│   ├── src/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Pages/
│   │   ├── assets/
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│
├── Server/  # Backend Code
│   ├── Config/
│   ├── Controllers/
│   ├── Middleware/
│   ├── Models/
│   ├── Routes/
│   ├── server.js
│   ├── package.json
```

## Installation & Setup
### Prerequisites
- Node.js
- MongoDB (Local or Atlas)

### Backend Setup
1. Navigate to the server directory:
   ```sh
   cd Server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and configure the following:
   ```env
   MONGO_URI=your_mongo_db_uri
   JWT_SECRET=your_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_KEY_SECRET=your_razorpay_secret
   ```
4. Start the backend server:
   ```sh
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```sh
   cd Client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```


## Screenshots
### Home Page
![Home Page](screenshot/Home-Page)

### All Doctors
![All Doctors](screenshot/All-Doctor)

### Book Appointment
![Book Appointment](screenshot/Book-Appointment)



