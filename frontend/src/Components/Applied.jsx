import { useState, useEffect } from "react";
import axios from "axios";
import { GoBookmarkSlashFill } from "react-icons/go";
import { toast } from "react-toastify";
import { Briefcase, MapPin, Clock, DollarSign } from "lucide-react";

const Applied = () => {
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id") || "user123"; // Replace with your auth system

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/applied-jobs`
        );
        setAppliedJobs(response.data.appliedJobs || []);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching applied jobs:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch applied jobs");
        setLoading(false);
      }
    };
    fetchAppliedJobs();
  }, [userId]);

  const handleDelete = async (appliedJobId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/applied-jobs/${appliedJobId}`,
        {
          data: { userId }, // Send userId in the request body
        }
      );

      if (response.status === 200) {
        setAppliedJobs((prev) =>
          prev.filter((job) => job._id !== appliedJobId)
        );
        toast.success("Applied job removed successfully");
      }
    } catch (error) {
      console.error(
        "Error deleting applied job:",
        error.response?.data || error.message
      );
      toast.error(
        error.response?.data?.message || "Failed to delete applied job"
      );
    }
  };

  if (loading) {
    return (
      <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-white">
        <h3 className="text-2xl font-semibold">Applied Jobs</h3>
        <div className="w-full h-[80%] flex justify-center items-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  // Filter out applied jobs where jobId is missing or invalid
  const validAppliedJobs = appliedJobs.filter(
    (appliedJob) => appliedJob?.jobId
  );

  if (validAppliedJobs.length === 0) {
    return (
      <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-white">
        <h3 className="text-2xl font-semibold">Applied Jobs</h3>
        <div className="w-full h-[80%] gap-2 flex justify-center items-center flex-col">
          <span className="text-4xl md:text-5xl lg:text-6xl cursor-pointer">
            <GoBookmarkSlashFill />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl cursor-pointer">
            No Applied Jobs
          </h2>
        </div>
      </div>
    );
  }

  return (
    <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-white overflow-y-auto">
      <h3 className="text-2xl font-semibold mb-6">Applied Jobs</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {validAppliedJobs.map((appliedJob) => (
          <div
            key={appliedJob?._id}
            className="bg-white w-full max-w-[22rem] p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-gray-200 group relative"
          >
            <div className="flex flex-col gap-4">
              {/* Header Section */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
                  <img
                    src={appliedJob?.jobId?.companyLogo || "/default-logo.png"}
                    alt={appliedJob?.jobId?.company || "Company"}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                    {appliedJob?.jobId?.title || "Untitled Job"}
                  </h3>
                  <p className="text-gray-600 text-sm truncate">
                    {appliedJob?.jobId?.company || "Unknown Company"}
                  </p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-600">
                {[
                  { icon: Briefcase, text: appliedJob?.jobId?.type || "N/A" },
                  { icon: MapPin, text: appliedJob?.jobId?.location || "N/A" },
                  { icon: Clock, text: appliedJob?.jobId?.posted || "N/A" },
                  {
                    icon: DollarSign,
                    text: appliedJob?.jobId?.salary || "N/A",
                  },
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <Icon className="w-4 h-4 text-gray-400" />
                    <span className="truncate">{text}</span>
                  </div>
                ))}
              </div>

              {/* Skills Section */}
              <div className="flex flex-wrap gap-2">
                {(Array.isArray(appliedJob?.jobId?.skills)
                  ? appliedJob.jobId.skills.slice(0, 5)
                  : []
                ).map((skill, index) => (
                  <span
                    key={index}
                    className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                  >
                    {skill}
                  </span>
                ))}
                {Array.isArray(appliedJob?.jobId?.skills) &&
                  appliedJob.jobId.skills.length > 5 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      +{appliedJob.jobId.skills.length - 5}
                    </span>
                  )}
              </div>

              {/* Remove Button */}
              <button
                onClick={() => handleDelete(appliedJob?._id)}
                className="mt-2 w-full py-2 px-4 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
                aria-label={`Remove ${
                  appliedJob?.jobId?.title || "job"
                } from applied jobs`}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Applied;
