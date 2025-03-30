import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  companyLogo: { type: String, required: true },
  type: { type: String, required: true },
  location: { type: String, required: true },
  posted: { type: String, required: true },
  salary: { type: String, required: true },
  skills: { type: [String], required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  resume: { type: String, required: false },
});

const Job = mongoose.model("Job", jobSchema, "allJobs");
export default Job;
