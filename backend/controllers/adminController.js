import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModels.js";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";



// api for adding a doctor

const addDoctor = async (req, res) => {
  try {
    const { name, email, password, speciality, degree, experience, about, available, fees, address, date } = req.body;
    const imageFile = req.file;

    // check for all data to add doctor
    if (!name || !email || !password || !speciality || !degree || !experience || !about  || !fees || !address || !imageFile) {
      return res.status(400).send({
        message: "Please provide all required fields",
        success: false,
      });
    }
    //validating email format
    if (!validator.isEmail(email)) {
      return res.status(400).send({
        message: "Please provide a valid email",
        success: false,
      });
    }

    //validating password length
    if (!validator.isLength(password, { min: 8 })) {
      return res.status(400).send({
        message: "Password must be at least 8 characters",
        success: false,
      });
    }

    //hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type: "image", folder: "doctors"});
    const imageUrl = imageUpload.secure_url;

    // create new doctor
    const doctorData = {
      name,
      email,
      password: hashedPassword,
      speciality,
      degree,
      experience,
      about,
      available,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      image: imageUrl,
    };

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();
    res.json({
      message: "Doctor added successfully",
      success: true,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error adding doctor",
      success: false,
      error,
    });
  }
};

//api for admin login

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body; 

    // Check if admin email and password are correct
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

      const token =jwt.sign(email+password, process.env.JWT_SECRET);
      res.json({
        message: "Admin login successful",
        success: true,
        token,
      });
      // res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 24 * 60 * 60 * 1000 });
      // return res.status(200).send({
      //   message: "Admin login successful",
      //   success: true,
      //   token,
      // });
    }

    return res.status(401).send({
      message: "Invalid email or password",
      success: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error logging in",
      success: false,
      error,
    });
  }
};

//api for get all doctors

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorModel.find({}).select("-password");
    res.json({
      message: "Doctors fetched successfully",
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching doctors",
      success: false,
      error,
    });
  }
};

//Api to get all appointment list
const appointmentsAdmin = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({})
    res.json({
      message: "Appointments fetched successfully",
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
}

//Api to cancel appointment

const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment not found" });
    }
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });

    const { docId, slotDate, slotTime } = appointment;
    const docData = await doctorModel.findById(docId);
    let slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (time) => time !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });
    if (slots_booked[slotDate].length === 0) {
      delete slots_booked[slotDate];
    }
    res
      .status(200)
      .json({ success: true, message: "Appointment canceled successfully" });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ success: false, message: "Error canceling appointment", error });
  }
};

//Api to get dashboard data for admin panel

const adminDashboard = async (req, res) => {
  try {
    const appointments = await appointmentModel.find({});
    const doctors = await doctorModel.find({});
    const users= await userModel.find({});

    const dashData = {
      doctors: doctors.length,
      appointments: appointments.length,
      patients: users.length,
      latestAppointments: appointments.slice(-5).reverse(),
    }
    res.json({
      message: "Dashboard data fetched successfully",
      success: true,
      dashData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching dashboard data",
      success: false,
      error,
    });
  }
}

export { addDoctor, loginAdmin, allDoctors , appointmentsAdmin, appointmentCancel , adminDashboard};