import express from 'express'
import cors from 'cors';
import 'dotenv/config'
import connectdb from './Config/Mongodb.js';
import connectCloudinary from './Config/Cloudinary.js';
import adminRouter from './Routes/Admin.Route.js';
import doctorRouter from './Routes/Doctor.Route.js';
import userRouter from './Routes/User.Routes.js';

const app = express();
const port = process.env.PORT || 4000;
connectdb()
connectCloudinary()

//middleware
app.use(express.json());
app.use(cors());

// api endpoints
app.get('/',(req,res)=>{
    res.send('API WORKING');
})

app.use('/api/admin',adminRouter);
app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter);

app.listen(port,()=>(
    console.log('Server Started',port)
))