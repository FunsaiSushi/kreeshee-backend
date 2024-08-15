// signup.controller.js

import bcrypt from "bcryptjs";
import User from "../../models/user.model.js";
import { validatePassword } from "../../utils/passValidation.js";

const signup = async (req, res) => {
  try {
    const { name, email, password, firebaseUid } = req.body;

    // Validate password
    if (!validatePassword(password)) {
      return res.status(400).json({ error: "Invalid password format" });
    }

    // Extract the first part of the name as the nickname
    const nickname = name.split(" ")[0];

    // Generate username from name and convert to lowercase
    let username = name.replace(/\s+/g, "").toLowerCase();

    // Check if the username already exists in the database
    let userWithSameUsername = await User.findOne({ username });

    // If the username exists, append random numbers to it until it becomes unique
    let counter = 1;
    while (userWithSameUsername) {
      username = `${username}${counter}`;
      userWithSameUsername = await User.findOne({ username });
      counter++;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      username,
      nickname,
      email,
      password: hashedPassword,
      firebaseUid,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default signup;
