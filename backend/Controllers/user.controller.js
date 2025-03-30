//user model import
import User from "../Models/user.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { emailTemplate, otpTemplate } from "../Templates/mailtemplate.js";
import sendEmail from "../Utils/mailer.js";
import customError from "../Utils/customError.js";
import jwt from "jsonwebtoken";
import { upload } from "../Middlewares/multer.js";
export const profileUploadMiddleware = upload.single("file");
export const resumeUploadMiddleware = upload.single("resume");

//signup controller
export const userSignupController = async (req, res, next) => {
  const { fname, lname, email, password, phone, role } = req.body; // Extract role from request body

  if (!fname || !email || !lname || !password || !phone || !role) {
    throw new customError(401, "All fields are required, including role.");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const mailToken = crypto.randomBytes(12).toString("hex");

  await User.create({
    fname,
    lname,
    email,
    password: hashedPassword,
    phone,
    role, // Save the role to the database
    emailToken: mailToken,
  });

  const user = await User.findOne({ email });
  const id = user._id.toString();

  const personalizedTemplate = emailTemplate
    .replace("{name}", fname)
    .replace(
      "{link}",
      `http://localhost:5000/api/verification/${id}/${mailToken}`
    );

  sendEmail(email, "Email Verification", personalizedTemplate);

  res
    .status(201)
    .json({ message: "User created successfully, kindly verify your email." });
};

export const userMailController = async (req, res) => {
  const { id, emailtoken } = req.params; //token from params
  const user = await User.findOne({ _id: id });

  if (!user) {
    res.status(404).json({ message: "user not found" });
    throw new customError(404, "user not found");
  }
  const verificationtoken = user.emailToken; //token from db
  if (verificationtoken === emailtoken) {
    user.isVerified = true;
    user.emailToken = undefined;
    await user.save();
    res.redirect("http://localhost:5173/mail-verified-successfully");
  } else {
    res.redirect("http://localhost:5173/mail-verified-failed");
  }
};

export const passwordRest = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const newOTP = Math.floor(1000 + Math.random() * 9000);
  user.OTP = newOTP;
  await user.save();

  sendEmail(email, "Password Reset OTP", otpTemplate.replace("{otp}", newOTP));

  return res.json({
    message: "OTP sent to your registered email",
  });
};

export const verifyOTP = async (req, res) => {
  const { email } = req.params;
  const { OTP } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Check if the OTP entered by the user matches the one stored in the database
  if (user.OTP === OTP) {
    // OTP is correct, proceed with password reset logic
    return res.status(200).json({ message: "OTP verified successfully" });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};

export const resetPassword = async (req, res) => {
  const { email } = req.params; // email from the route params
  const { newPassword } = req.body; // new password from the body

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Hash the new password before saving it
  const hashedPassword = await bcrypt.hash(newPassword, 10);

  // Update user's password
  user.password = hashedPassword;
  user.OTP = undefined; // clear OTP after successful reset
  await user.save();

  return res.status(200).json({
    message: "Password reset successfully",
  });
};

// User Signin (Login) Controller
export const userSigninController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new customError(400, "Email and password are required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new customError(404, "User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Signin successful",
    token,
    user: {
      id: user._id,
      email: user.email,
      fname: user.fname,
      lname: user.lname,
      phone: user.phone,
      role: user.role,
    },
  });
};

export const userData = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id });

  res.json({ userData: user });
};

export const profileChange = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    let updateData = {};

    if (user.role === "employee") {
      updateData = {
        fname: req.body.fname || user.fname,
        lname: req.body.lname || user.lname,
        phone: req.body.phone || user.phone,
        position: req.body.position || user.position,
        location: req.body.location || user.location,
        experience: req.body.experience || user.experience,
        skills: req.body.skills
          ? req.body.skills.split(",").map((s) => s.trim())
          : user.skills,
      };
      if (req.file) updateData.profilePic = req.file.path;
    } else if (user.role === "employer") {
      updateData = {
        companyName: req.body.companyName || user.companyName,
        companyPhone: req.body.companyPhone || user.companyPhone,
        companyLocation: req.body.companyLocation || user.companyLocation,
        companyDescription:
          req.body.companyDescription || user.companyDescription,
        companySize: req.body.companySize || user.companySize,
        industry: req.body.industry || user.industry,
      };
      if (req.file) updateData.companyLogo = req.file.path;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return res
      .status(500)
      .json({ message: "Error updating profile", error: error.message });
  }
};

export const uploadResume = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role !== "employee")
      return res
        .status(403)
        .json({ message: "Only employees can upload resumes" });
    if (!req.file)
      return res.status(400).json({ message: "No resume file provided" });

    const resumeUrl = req.file.path;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { resume: resumeUrl },
      { new: true, runValidators: true }
    );

    return res.status(200).json({
      message: "Resume uploaded successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error uploading resume:", error);
    return res
      .status(500)
      .json({ message: "Error uploading resume", error: error.message });
  }
};
