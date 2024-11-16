import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from "cloudinary";

//API to register user

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({ success: false, message: "Please fill in all fields" });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters",
      });
    }

    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };

    const newUser = new userModel(userData);
    const user = await newUser.save();

    //creating token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({ success: true, token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to login user

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to get users profile data

const getProfile = async (req, res) => {
  try {

    const { userId } = req.body;
    const userData = await userModel.findById(userId).select("-password");

    res.json({ success: true, userData });

  } 
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//API to update users profile data

const updateProfile = async (req, res) => {
  try{

    const {userId, name, phone, address, dob, gender} = req.body;
    const imageFile = req.file;

    if(!name || !phone || !address || !dob || !gender){
        return res.json({success: false, message: "Please fill in all fields"});
    }

  await userModel.findByIdAndUpdate(userId, {name, phone, address:JSON.parse(address), dob, gender})

  if(imageFile){
    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path,{resource_type: "image"});
    const imageUrl = imageUpload.secure_url;

    await userModel.findByIdAndUpdate(userId, {image: imageUrl})
  }

  res.json({success: true, message: "Profile updated successfully"});

  }
  catch(error){
    console.log(error);
    res.json({success: false, message: error.message});
  }
}



export { registerUser, loginUser, getProfile, updateProfile };