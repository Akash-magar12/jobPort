import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Briefcase, MapPin, Clock, DollarSign, Edit, X } from "lucide-react";
import JobEditForm from "./JobEditForm";

const JobMakerRight = () => {
  const [createdJobs, setCreatedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("id") || "user123";
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const fetchCreatedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}/created-jobs`
        );
        setCreatedJobs(response.data.jobs || []);
        setLoading(false);
      } catch (error) {
        console.error(
          "Error fetching created jobs:",
          error.response?.data || error.message
        );
        toast.error("Failed to fetch created jobs");
        setLoading(false);
      }
    };
    fetchCreatedJobs();
  }, [userId]);

  const handleDelete = async (jobId) => {
    try {
      await axios.delete(`http://localhost:5000/api/createdJobs/${jobId}`);
      setCreatedJobs((prev) => prev.filter((job) => job._id !== jobId));
      toast.success("Job deleted successfully");
    } catch (error) {
      console.error(
        "Error deleting job:",
        error.response?.data || error.message
      );
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  const openEditModal = (job) => {
    setCurrentJob(job);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setCurrentJob(null);
  };

  const handleUpdate = async (updatedJobData) => {
    try {
      await axios.put(
        `http://localhost:5000/api/createdJobs/${updatedJobData._id}`,
        updatedJobData
      );
      setCreatedJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === updatedJobData._id ? updatedJobData : job
        )
      );
      toast.success("Job updated successfully");
      closeEditModal();
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  if (loading) {
    return (
      <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-white">
        <h3 className="text-2xl font-semibold">My Created Jobs</h3>
        <div className="w-full h-[80%] flex justify-center items-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (createdJobs.length === 0) {
    return (
      <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-white">
        <h3 className="text-2xl font-semibold">My Created Jobs</h3>
        <div className="w-full h-[80%] flex justify-center items-center flex-col gap-2">
          <span className="text-4xl md:text-5xl lg:text-6xl text-gray-400">
            <Briefcase />
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-gray-600">
            No Jobs Created Yet
          </h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-white overflow-y-auto">
        <h3 className="text-2xl font-semibold mb-6">My Created Jobs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {createdJobs.map((job) => (
            <div
              key={job._id}
              className="bg-white w-full max-w-[22rem] p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer border border-gray-100 hover:border-gray-200 group"
            >
              <div className="flex flex-col gap-4">
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
                    <p className="text-gray-600 text-sm truncate">
                      {job.company}
                    </p>
                  </div>
                </div>

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

                <div className="flex flex-wrap gap-2">
                  {(Array.isArray(job.skills)
                    ? job.skills.slice(0, 5)
                    : []
                  ).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                  {Array.isArray(job.skills) && job.skills.length > 5 && (
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-medium">
                      +{job.skills.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => openEditModal(job)}
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job._id)}
                    className="flex-1 py-2 px-4 rounded-lg text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-all"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showEditModal && currentJob && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">Edit Job</h3>
              <button
                onClick={closeEditModal}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <JobEditForm
                job={currentJob}
                onUpdate={handleUpdate}
                onCancel={closeEditModal}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobMakerRight;
