import mongoose from "mongoose";

const appliedJobSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  userId: { type: String, required: true }, // Adjust if using ObjectId
  appliedAt: { type: Date, default: Date.now },
});

const AppliedJob = mongoose.model("AppliedJob", appliedJobSchema);

export default AppliedJob;