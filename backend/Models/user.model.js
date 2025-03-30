import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    emailToken: { type: String, default: null },
    OTP: { type: String, default: null },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["employee", "employer"], required: true },
    profilePic: { type: String, default: null }, // For employees
    position: { type: String }, // For employees
    location: { type: String }, // Shared
    experience: { type: String }, // For employees
    skills: { type: [String], default: [] }, // For employees
    resume: {
      type: String,
      required: false, // Optional, change to true if mandatory
    },
    // Employer-specific fields (no companyWebsite)
    companyName: { type: String },
    companyPhone: { type: String },
    companyLocation: { type: String },
    companyDescription: { type: String },
    companySize: { type: String },
    industry: { type: String },
    companyLogo: { type: String, default: null },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
