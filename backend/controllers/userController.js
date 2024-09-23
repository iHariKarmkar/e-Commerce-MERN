import validator from "validator";
import bcrypt from 'bcrypt'
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}
// Route for Login
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success: false, message: "User does not exists!"})
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success: false, message: "Invalid credentials!"})
        }

        const token = createToken(user._id);
        res.json({success: true, message: "You're logged in!", token})

    } catch (error) {
        res.json({success: false, error: "Something went wrong!"})
    }
}

// Route for Register User
const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        // const exists = await userModel.findOne({email});
        const exists = await userModel.findOne({email: email})
        if(exists){
            return res.json({success: false, message: "User Already Exists!"});
        }
        if(name.length < 3){
            return res.json({success: false, message: "Please enter a valid name"})
        }
        if(!validator.isEmail(email)){
            return res.json({success: false, message: "Please enter a valid email!"})
        }
        if(password.length < 8){
            return res.json({success: false, message: "Please enter a strong password!"});
        }
// ========= checks for special character, uppercase and lowercase and number ==========        
        // if(!validator.isStrongPassword(password)){ 
        //     return res.json({success: false, message: "Please enter a strong password!"})
        // } 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        res.json({success: true, token})

    } catch (error) {
        res.json({success: false, error: error.message})

    }
}

// Route for Admin Login
const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, token});
        } else {
            res.json({success: false, message: "Invalid Credentials!"});
        }


    } catch (error) {
        res.json({success: false, error: error.message}) 
    }  
}

export {loginUser, registerUser, adminLogin}