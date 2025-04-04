import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateJobs = () => {
  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    companyLogo: "",
    type: "",
    location: "",
    salary: "",
    skills: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset previous messages

    try {
      const userId = localStorage.getItem("id"); // Get employer ID from localStorage

      const response = await axios.post(
        "https://jobport-kvn5.onrender.com/api/jobs/create",
        {
          ...jobData,
          skills: jobData.skills.split(",").map((skill) => skill.trim()), // Convert skills to array
          userId,
        }
      );

      setMessage("Job created successfully!");

      // Reset form
      setJobData({
        title: "",
        company: "",
        companyLogo: "",
        type: "",
        location: "",
        salary: "",
        skills: "",
      });
      navigate("/employer/created-jobs");
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg h-fit mt-20">
      <h2 className="text-2xl font-semibold text-center mb-4">Create Job</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded ${
            message.includes("successfully")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={jobData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="company"
          placeholder="Company Name"
          value={jobData.company}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="companyLogo"
          placeholder="Company Logo URL"
          value={jobData.companyLogo}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />

        <select
          name="type"
          value={jobData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Select Job Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Remote">Remote</option>
          <option value="Contract">Contract</option>
        </select>

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={jobData.location}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={jobData.salary}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={jobData.skills}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJobs;
