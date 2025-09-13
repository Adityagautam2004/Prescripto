import validator from 'validator'
import bcrypt from 'bcrypt'
import userModel from '../models/userModel.js';

//Api to register user
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       if(!name || !email || !password){
        return res.status(400).json({success: false, message: 'Please fill all the fields' });
       }
       if(!validator.isEmail(email)){
        return res.status(400).json({success: false, message: 'Please enter a valid email' });
       }
       if(password.length < 6){
        return res.status(400).json({success: false, message: 'Password must be at least 6 characters' });
       }

       //hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password, salt);
       const user = {
        name,
        email,
        password: hashedPassword
       }
       res.status(201).json({success: true, message: 'User registered successfully', user });
       //Generate token
       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
       })
       res.status(201).json({success: true, message: 'User registered successfully', user, token });
    } catch (error) {
        res.status(400).json({success: false, message: 'Error registering user', error });
    }
}
