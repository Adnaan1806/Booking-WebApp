import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctorModel.js";

// API for Adding Doctor

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const imageFile = req.file;

    // checking for all data to add doctor
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      return res.json({ success: false, message: "All fields are required" });
    }

    // validating email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid Email" });
    }

    // validating password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be atleast 8 characters long",
      });
    }

    // hashing Doctor Password // FOR SECURITY PURPOSE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

     // uplload image to cloudinary
     const imageUpload = await cloudinary.uploader.upload(imageFile.path, {resource_type:"image"});
     const imageUrl = imageUpload.secure_url;

     // to store data in database
     const doctorData = {
        name,
        email,
        image: imageUrl,
        password: hashedPassword,
        speciality,
        degree,
        experience,
        about,
        fees,
        address:JSON.parse(address),
        date: Date.now(),
    }

    const newDoctor = new doctorModel(doctorData);
    await newDoctor.save();

    res.json({success: true, message: "Doctor Added Successfully"});

  } 
  
  catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message});
  }
};

export { addDoctor };