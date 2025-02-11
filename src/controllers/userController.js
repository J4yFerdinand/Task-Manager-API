import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import hashPassword from "../middlewares/hashPassword.js";
import comparePassword from "../middlewares/comparePassword.js";

//** 
//* @desc Register a new user
//* @route POST /api/users/register
//* @access Public */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //* Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //* Hash password before saving
    const hashedPassword = await hashPassword(password);

    //* Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
};

//** 
//* @desc Login a user
//* @route POST /api/users/login
//* @access Public */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //* Search user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //* Check password
    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    //* Generate token
    const token = generateToken(user.id);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

//**
//* @desc Get user profile
//* @route GET /api/users/profile
//* @access Private (requires authentication) */
export const getUserProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  } catch (error) {
    console.error("Error getting user profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};