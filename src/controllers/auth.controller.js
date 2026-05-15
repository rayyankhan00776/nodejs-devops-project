import UserModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// make controller for authentication and authorization
export async function registerController(req, res) {
  try {
    // destructure the request body
    const { userName, email, password } = req.body;

    // check if user already exists
    const existingUser = await UserModel.findOne(
        { $or: [{ userName: userName }, { email: email }] }
    );

    // if user already exists, send error response
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // validate password length
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }

    // hashing the password
    const hashedPW = await crypto.createHash("sha256").update(password).digest("hex");

    // create new user
    const newUser = new UserModel({ userName, email, password: hashedPW });

    // save the user to the database
    await newUser.save();

    // generate JWT token with userId (after user is saved and has _id)
    const token = jwt.sign(
      { userId: newUser._id, userName, email }, 
      process.env.JWT_SECRET, 
      { expiresIn: "1h" }
    );

    // send response with token and user data
    res.status(201).json({ 
      message: "User registered successfully", 
      data : { userId: newUser._id, userName, email }, 
      token 
    });

  } catch (error) {
    // if any error occurs, send error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

export async function loginController(req, res) {
  try {
    // destructure the request body
    const { email, password } = req.body;

    // find user by email
    const user = await UserModel.findOne({ email });

    // if user not found, send error response
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    
    // hash the provided password and compare with stored hash
    const hashedPW = await crypto.createHash("sha256").update(password).digest("hex");
    if (hashedPW !== user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // generate JWT token with userId
    const token = jwt.sign({ userId: user._id, userName: user.userName, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1d" });

    // send response with token and user data
    res.status(200).json({ 
      message: "Login successful", 
      data : { userId: user._id, userName: user.userName, email: user.email }, 
      token 
    });

  } catch (error) {
    // if any error occurs, send error response
    res.status(500).json({ message: "Server error", error: error.message });
  }
} 


// exporting the controller
export default { registerController, loginController };