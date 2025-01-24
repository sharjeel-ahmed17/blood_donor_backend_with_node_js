import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import {
  loginSchema,
  createUserSchema,
} from "../validations/auth.validation.js";

import sendEmail from "../helpers/sendEmail.js";
import sendResponse from "../helpers/sendResponse.js";

const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
      location,
      height,
      weight,
      imageUrl,
      cnic,
      isAvailable,
    } = req.body;

   
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

   
    const hashedPassword = await bcrypt.hash(password, 10);

 
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      location,
      height,
      weight,
      imageUrl,
      cnic,
      isAvailable,
    });


    const savedUser = await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id });

    user.refreshToken = refreshToken;
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res.json({ accessToken, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    // Clear the refresh token in the database
    const user = await User.findOne({ refreshToken });
    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    // Clear the cookie
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token provided" });

    // Check if the refresh token is valid
    const user = await User.findOne({ refreshToken });
    if (!user)
      return res.status(403).json({ message: "Invalid refresh token" });

    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({ message: "Invalid refresh token" });

        // Generate a new access token
        const newAccessToken = generateAccessToken({
          id: user._id,
          role: user.role,
        });
        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return sendResponse(res, 404, null, true, "User not found");

  const resetToken = crypto.randomBytes(32).toString("hex");
  user.verificationToken = resetToken;
  await user.save();

  const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;
  await sendEmail(
    email,
    "Reset Password",
    `Click here to reset your password: ${resetUrl}`
  );

  sendResponse(res, 200, null, false, "Password reset email sent.");
};


const resetPassword = async (req, res) => {
  const { token } = req.query;
  const { newPassword } = req.body;

  const user = await User.findOne({ verificationToken: token });
  if (!user)
    return sendResponse(res, 400, null, true, "Invalid or expired token");

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  user.verificationToken = undefined;
  await user.save();

  sendResponse(res, 200, null, false, "Password reset successfully.");
};

const sendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  console.log(user);
  
  if (!user) return sendResponse(res, 404, null, true, "User not found");

  const otp = Math.floor(100000 + Math.random() * 900000);
  user.verificationToken = otp;
  await user.save();

  await sendEmail(email, "Your OTP Code", `Your OTP is ${otp}`);

  sendResponse(res, 200, null, false, "OTP sent to email.");
};


const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({ verificationToken: token });
  if (!user) return sendResponse(res, 400, null, true, "Invalid or expired token");

  user.isVerified = true;
  user.verificationToken = undefined;
  await user.save();

  sendResponse(res, 200, null, false, "Email verified successfully.");
};

export {
  createUser,
  login,
  logout,
  refreshToken,
  forgotPassword,
  resetPassword,
  sendOtp,
  verifyEmail,
};
