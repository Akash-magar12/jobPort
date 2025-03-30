import AppliedJob from "../Models/appliedJobsModel.js";
import Job from "../Models/job.model.js";

export const allJobs = async (req, res) => {
  try {
    const allJobs = await Job.find();
    res
      .status(200)
      .json({ message: "All jobs fetched successfully", jobs: allJobs });
  } catch (error) {
    console.error("Error fetching jobs:", error);
    return res
      .status(500)
      .json({ message: "Error fetching jobs", error: error.message });
  }
};

export const getJobById = async (req, res) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job fetched successfully", job });
  } catch (error) {
    console.error("Error fetching job by ID:", error);
    res
      .status(500)
      .json({ message: "Error fetching job", error: error.message });
  }
};

export const applyForJob = async (req, res) => {
  const { jobId, userId } = req.body;
  try {
    const existingApplication = await AppliedJob.findOne({ jobId, userId });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "You have already applied for this job" });
    }

    const appliedJob = new AppliedJob({ jobId, userId });
    await appliedJob.save();
    res.status(201).json({ message: "Application saved successfully" });
  } catch (error) {
    console.error("Error applying for job:", error);
    res
      .status(500)
      .json({ message: "Error applying for job", error: error.message });
  }
};

export const getUserAppliedJobs = async (req, res) => {
  const { userId } = req.params;
  try {
    const appliedJobs = await AppliedJob.find({ userId }).populate("jobId");
    if (!appliedJobs.length) {
      return res
        .status(200)
        .json({ message: "No applied jobs found", appliedJobs: [] });
    }
    res
      .status(200)
      .json({ message: "Applied jobs fetched successfully", appliedJobs });
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    res
      .status(500)
      .json({ message: "Error fetching applied jobs", error: error.message });
  }
};

export const deleteAppliedJob = async (req, res) => {
  const { id } = req.params; // The _id of the appliedJobs document
  const userId = req.body.userId; // Ensure userId matches the logged-in user

  try {
    const appliedJob = await AppliedJob.findOne({ _id: id, userId });
    if (!appliedJob) {
      return res
        .status(404)
        .json({ message: "Applied job not found or not authorized" });
    }

    await AppliedJob.deleteOne({ _id: id, userId });
    res.status(200).json({ message: "Applied job deleted successfully" });
  } catch (error) {
    console.error("Error deleting applied job:", error);
    res
      .status(500)
      .json({ message: "Error deleting applied job", error: error.message });
  }
};

export const createJob = async (req, res) => {
  try {
    const userId = req.body.userId || "user123"; // Replace with auth middleware to get user ID
    const jobData = {
      ...req.body, // Spread the incoming job data (title, company, etc.)
      createdBy: userId, // Add the userId as createdBy
      posted: new Date().toLocaleDateString(), // Add current date (e.g., "3/27/2025")
      // Alternative: Use a more detailed timestamp
      // posted: new Date().toISOString(), // e.g., "2025-03-27T14:30:00.000Z"
    };
    const job = new Job(jobData);
    await job.save();
    res.status(201).json({ job });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create job", error: error.message });
  }
};

export const getUserCreatedJobs = async (req, res) => {
  try {
    const { userId } = req.params;
    const jobs = await Job.find({ createdBy: userId });
    res.status(200).json({ jobs });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch created jobs", error: error.message });
  }
};

export const deleteCreatedJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body; // Get userId from request body

    // Find the job and ensure it belongs to the user
    const job = await Job.findOne({ _id: id, createdBy: userId });
    if (!job) {
      return res
        .status(404)
        .json({ message: "Job not found or not authorized" });
    }

    await Job.deleteOne({ _id: id });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete job", error: error.message });
  }
};

export const updateCreatedJob = async (req, res) => {
  const { id } = req.params;
  const updatedJobData = req.body;

  try {
    const updatedJob = await Job.findByIdAndUpdate(id, updatedJobData, {
      new: true,
      runValidators: true,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json(updatedJob);
  } catch (error) {
    console.error("Error updating job:", error);
    res
      .status(500)
      .json({ message: "Error updating job", error: error.message });
  }
};
