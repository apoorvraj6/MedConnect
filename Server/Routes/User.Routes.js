import express from 'express'
import { registerUser,loginUser, getProfile, updateProfile, bookAppointment, getUserAppointment,cancelAppointment,paymentrazorpay,verifyRazorpay } from '../Controllers/User.Controller.js';
import authUser from '../Middleware/AuthUser.js';
import upload from '../Middleware/Multer.js';

const userRouter = express.Router();

userRouter.post('/register-user',registerUser)
userRouter.post('/login-user',loginUser)
userRouter.get('/get-profile',authUser,getProfile)
userRouter.post('/update-profile',upload.single('image'),authUser,updateProfile)
userRouter.post('/book-appointment',authUser,bookAppointment)
userRouter.get('/appointments',authUser,getUserAppointment)
userRouter.post('/cancel-appointment',authUser,cancelAppointment);
userRouter.post('/payment-razorpay',authUser,paymentrazorpay);
userRouter.post('/verify-razorpay',authUser,verifyRazorpay);






export default userRouter;