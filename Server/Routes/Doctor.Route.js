import express from 'express'
import { doctorList } from '../Controllers/Doctor.Controller.js';

const doctorRouter = express.Router();

doctorRouter.get('/list',doctorList)

export default doctorRouter