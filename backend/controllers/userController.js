import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModels.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import razorpay from "razorpay";

//Api to register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters",
        });
    }

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = await userModel.create(userData);
    const user = await newUser.save();

    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(201)
      .json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error registering user", error });
  }
};

//Api to login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }
    //Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res
      .status(200)
      .json({ success: true, message: "User logged in successfully", token });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error logging in user", error });
  }
};

//API to get user profile data
const getProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");
    if (!userData) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({
      success: true,
      message: "User profile data",
      userData: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        gender: userData.gender,
        dob: userData.dob,
        image: userData.image,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error getting user profile data",
        error,
      });
  }
};

//API to update user profile data
const updateProfile = async (req, res) => {
  try {
    const userId = req.body.userId; // Get userId from auth middleware
    const user = await userModel.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    const { name, email, address, gender, dob, phone } = req.body;
    const imageFile = req.file;
    if (!name || !gender || !dob || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Parse address if it's a string, otherwise use as is
    let parsedAddress = address;
    if (typeof address === "string") {
      try {
        parsedAddress = JSON.parse(address);
      } catch (error) {
        return res
          .status(400)
          .json({ success: false, message: "Invalid address format" });
      }
    }

    await userModel.findByIdAndUpdate(userId, {
      name,
      address: parsedAddress,
      gender,
      dob,
      phone,
    });
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "users",
      });
      const imageUrl = imageUpload.secure_url;
      await userModel.findByIdAndUpdate(userId, { image: imageUrl });
    }
    res
      .status(200)
      .json({ success: true, message: "User profile data updated" });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error updating user profile data",
        error,
      });
  }
};

// API to book appointment
const bookAppointment = async (req, res) => {
  try {
    const { userId, docId, slotDate, slotTime } = req.body;
    const docData = await doctorModel.findById(docId).select("-password");
    if (!docData.available) {
      return res
        .status(400)
        .json({ success: false, message: "Doctor not available" });
    }
    let slots_booked = docData.slots_booked;
    // checking for slots availibitiy
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res
          .status(400)
          .json({ success: false, message: "Slot not available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }
    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };
    const newAppointment = new appointmentModel(appointmentData);
    await newAppointment.save();
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res
      .status(200)
      .json({
        success: true,
        message: "Appointment booked successfully",
        appointmentData,
      });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error booking appointment", error });
  }
};

// API to get user appointments
const getUserAppointments = async (req, res) => {
  try {
    const { userId } = req.body;
    const appointments = await appointmentModel
      .find({ userId })
      .sort({ date: -1 });
    res
      .status(200)
      .json({
        success: true,
        message: "User appointments fetched successfully",
        appointments,
      });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: "Error fetching user appointments",
        error,
      });
  }
};

// API to cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const { userId, appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
    if (!appointment) {
      return res
        .status(400)
        .json({ success: false, message: "Appointment not found" });
    }
    if (appointment.userId !== userId) {
      return res
        .status(400)
        .json({
          success: false,
          message: "You are not authorized to cancel this appointment",
        });
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

// api to make payment of appointment using razorpay

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Appointment not found or cancelled",
        });
    }
    if (appointmentData.userId !== userId) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "You are not authorized to make payment for this appointment",
        });
    }
    if (appointmentData.payment) {
      return res
        .status(400)
        .json({ success: false, message: "Payment already done" });
    }
    const { userId } = req.body;
    // creating options for razorpay payment
    const options = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    const order = await razorpayInstance.orders.create(options);
    if (!order) {
      return res
        .status(400)
        .json({ success: false, message: "Error creating order" });
    }
    res
      .status(200)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    res
      .status(400)
      .json({ success: false, message: "Error creating order", error });
  }
};

//API to verify payment
const verifyRazorpay = async (req, res) => {
    try {
        const {razorpay_order_id}=req.body;
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
        if(orderInfo.status === 'paid'){
            await appointmentModel.findByIdAndUpdate(orderInfo.receipt, {payment: true});
            return res.status(200).json({success: true, message: 'Payment verified'});
        }
        return res.status(400).json({success: false, message: 'Payment verification failed'});
    } catch (error) {
        res.status(400).json({success: false, message: 'Error verifying payment', error});
    }
}


export {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  bookAppointment,
  getUserAppointments,
  cancelAppointment,
  paymentRazorpay,
  verifyRazorpay,
};
