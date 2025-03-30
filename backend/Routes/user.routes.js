import express from "express";
import {
  userSignupController,
  userMailController,
  passwordRest,
  verifyOTP,
  resetPassword,
  userSigninController,
  userData,
  profileChange,
  profileUploadMiddleware,
  resumeUploadMiddleware,
  uploadResume,
} from "../Controllers/user.controller.js";
import asyncHandle from "../Utils/asyncHandle.js";
export const routes = express.Router();
import {
  allJobs,
  applyForJob,
  createJob,
  deleteAppliedJob,
  deleteCreatedJob,
  getJobById,
  getUserAppliedJobs,
  getUserCreatedJobs,
  updateCreatedJob,
} from "../Controllers/job.controller.js";

//api endpoints for user
routes.post("/signup", asyncHandle(userSignupController));
routes.get("/verification/:id/:emailtoken", asyncHandle(userMailController));
routes.post("/forgot-password", asyncHandle(passwordRest));
routes.post("/verify-otp/:email", asyncHandle(verifyOTP));
routes.post("/reset-password/:email", asyncHandle(resetPassword));
routes.post("/signin", asyncHandle(userSigninController));
routes.get("/user/:id", asyncHandle(userData));
routes.get("/allJobs", asyncHandle(allJobs));
routes.post("/apply", asyncHandle(applyForJob));
routes.get("/jobs/:id", asyncHandle(getJobById));
routes.get("/user/:userId/applied-jobs", asyncHandle(getUserAppliedJobs));
routes.put("/profileChange/:id", profileUploadMiddleware, profileChange);
routes.put("/uploadResume/:id", resumeUploadMiddleware, uploadResume);
routes.post("/jobs/create", asyncHandle(createJob));
routes.delete("/applied-jobs/:id", asyncHandle(deleteAppliedJob)); //
routes.get("/user/:userId/created-jobs", asyncHandle(getUserCreatedJobs));
routes.delete("/createdJobs/:id", asyncHandle(deleteCreatedJob));
routes.put("/createdJobs/:id", updateCreatedJob);