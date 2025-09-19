import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointmentModels.js";

const changeAvailibility = async (req, res) =>{
    try {
        const {docId}=req.body

        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{
            available:!docData.available
        })
        res.json({
            success: true,
            message: "Availibility updated"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

const doctorList = async (req, res) =>{
    try {
        const doctors = await doctorModel.find({}).select(["-password","-email"]);
        res.json({
            success: true,
            message: "Doctor list",
            doctors
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

//API for doctor Login

const loginDoctor = async (req, res) =>{
    try {
        const {email, password} = req.body;
        const doctor = await doctorModel.findOne({email});
        if(!doctor){
            return res.json({
                success: false,
                message: "Doctor not found"
            })
        }

        //Compare password
        const isPasswordMatch = await bcrypt.compare(password, doctor.password);
        if(!isPasswordMatch){
            return res.json({
                success: false,
                message: "Invalid credentials"
            })
        }
        //Generate token
        const token = jwt.sign({id: doctor._id}, process.env.JWT_SECRET);
        res.json({
            success: true,
            message: "Login successful",
            doctor,
            token
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

//Api to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) =>{
    try {
        const {docId}=req.body
        const appointments = await appointmentModel.find({doctor:docId})
        res.json({
            success: true,
            message: "Appointments list",
            appointments
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

// API to mark appointment completed for doctor panel
const markAppointmentComplete = async (req, res) =>{
    try {
        const {docId, appointmentId}=req.body
        const appointment = await appointmentModel.findById(appointmentId)
        if(appointment && appointment.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{
                isCompleted: true
            })
            return res.json({
                success: true,
                message: "Appointment marked completed"
            })
        }
        res.json({
            success: false,
            message: "Appointment not found or not authorized"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

// API to cancel appointment for doctor panel
const cancelAppointment = async (req, res) =>{
    try {
        const {docId, appointmentId}=req.body
        const appointment = await appointmentModel.findById(appointmentId)
        if(appointment && appointment.docId === docId){
            await appointmentModel.findByIdAndUpdate(appointmentId,{
                cancelled: true
            })
            return res.json({
                success: true,
                message: "Appointment marked cancelled"
            })
        }
        res.json({
            success: false,
            message: "Appointment not found or not authorized"
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

// API to get doctor appointments for doctor panel
const doctorDashboard = async (req, res) =>{
    try {
        const {docId}=req.body
        const appointments = await appointmentModel.find({docId})

        let earnings = 0;
        appointments.map((item)=>{
            if(item.isCompleted || item.payment){
                earnings += item.amount;
            }
        })

        let patients = []

        appointments.map((item)=>{
           if(!patients.includes(item.userId)){
            patients.push(item.userId)
           }
        })
        const dashData = {
            appointments: appointments.length,
            earnings,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0,5)
        }
        res.json({
            success: true,
            message: "Doctor dashboard data",
            dashData
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

// API to get doctor dashboard data for doctor panel
const doctorProfile = async (req, res) =>{
    try {
        const {docId}=req.body
        const profileData = await doctorModel.findById(docId).select("-password");
        res.json({
            success: true,
            message: "Doctor profile data",
            profileData
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}

// API to update doctor profile for doctor panel
const updateDoctorProfile = async (req, res) =>{
    try {
        const {docId, fees, address, available}=req.body
        const updatedProfile = await doctorModel.findByIdAndUpdate(docId, {fees, address, available}) 
        res.json({
            success: true,
            message: "Doctor profile updated",
            updatedProfile
        })
    } catch (error) {
        console.log(error);
        res.json({
            success: false,
            message: "Internal server error"
        })
    }
}   

export {
    changeAvailibility,
    doctorList,
    loginDoctor,
    appointmentsDoctor,
    markAppointmentComplete,
    cancelAppointment,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile
}



