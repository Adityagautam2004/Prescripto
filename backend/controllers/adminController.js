import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";
import jwt from "jsonwebtoken";



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

export { addDoctor, loginAdmin };