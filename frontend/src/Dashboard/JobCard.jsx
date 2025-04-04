/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";

const JobCard = ({ job, onApply, appliedJobs = [] }) => {
  const [applyStatus, setApplyStatus] = useState("idle");
  const userId = localStorage.getItem("id");
  const token = localStorage.getItem("token"); // Get token from local storage

  // Check if the job is already applied based on appliedJobs prop or local state
  const isAlreadyApplied = Array.isArray(appliedJobs) && appliedJobs.some(
    (appliedJob) => appliedJob.job?._id === job._id
  );

  // Set initial applyStatus based on appliedJobs when component mounts
  useEffect(() => {
    if (isAlreadyApplied) {
      setApplyStatus("applied");
    }
  }, [isAlreadyApplied]);

  const handleApply = async () => {
    if (isAlreadyApplied || applyStatus === "applied") {
      toast.info("You have already applied to this job", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setApplyStatus("applying");

    try {
      if (!userId) {
        toast.error("Please log in to apply for this job.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setApplyStatus("idle");
        return;
      }

      if (!token) {
        toast.error("Authentication token is missing. Please login again.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setApplyStatus("idle");
        return;
      }

      const response = await axios.post(
        "https://jobport-kvn5.onrender.com/api/apply",
        {
          jobId: job._id,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the header
          },
        }
      );

      if (response.status === 201) {
        setApplyStatus("applied");
        onApply?.(job);

        toast.success("Job application submitted successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to apply. Please try again.";
      console.error("Error applying for job:", error.response?.data || error.message);
      setApplyStatus("error");

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setTimeout(() => setApplyStatus("idle"), 2000);
    }
  };

  return (
    <div className="bg-white w-full max-w-[22rem] p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-gray-200 group">
      <div className="flex flex-col gap-4">
        {/* Header Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <img
              src={job.companyLogo || "/default-logo.png"}
              alt={job.company}
              className="w-6 h-6 object-contain"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
              {job.title}
            </h3>
            <p className="text-gray-600 text-sm truncate">{job.company}</p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
          {[
            { icon: Briefcase, text: job.type || "N/A" },
            { icon: MapPin, text: job.location || "N/A" },
            { icon: Clock, text: job.posted || "N/A" },
            { icon: DollarSign, text: job.salary || "N/A" },
          ].map(({ icon: Icon, text }, index) => (
            <div key={index} className="flex items-center gap-1.5">
              <Icon className="w-4 h-4 text-gray-400" />
              <span className="truncate">{text}</span>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className="flex flex-wrap gap-2">
          {(Array.isArray(job.skills) ? job.skills.slice(0, 5) : []).map(
            (skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
              >
                {skill}
              </span>
            )
          )}
          {Array.isArray(job.skills) && job.skills.length > 5 && (
            <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
              +{job.skills.length - 5}
            </span>
          )}
        </div>

        {/* Action Button */}
        <button
          onClick={handleApply}
          disabled={applyStatus === "applying" || applyStatus === "applied" || isAlreadyApplied}
          aria-live="polite"
          aria-busy={applyStatus === "applying"}
          className={`mt-2 w-full py-2 px-4 rounded-lg text-sm font-medium transition-all ${
            isAlreadyApplied || applyStatus === "applied"
              ? "bg-green-600 text-white cursor-not-allowed"
              : applyStatus === "applying"
              ? "bg-gray-400 text-white cursor-not-allowed"
              : applyStatus === "error"
              ? "bg-red-600 text-white hover:bg-red-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isAlreadyApplied || applyStatus === "applied"
            ? "Applied"
            : applyStatus === "applying"
            ? "Applying..."
            : applyStatus === "error"
            ? "Try Again"
            : "Apply Now"}
        </button>
      </div>
    </div>
  );
};

export default JobCard;