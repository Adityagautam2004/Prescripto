import express from "express";
import { changeAvailibility, doctorList } from "../controllers/doctorController.js";


const doctorRouter = express.Router();


doctorRouter.get("/list", doctorList);

export default doctorRouter;
