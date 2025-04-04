import { IoSearchOutline } from "react-icons/io5";
import JobCard from "./JobCard";
import { useContext, useEffect, useState } from "react";
import { EmailContext } from "../Components/Context";
import axios from "axios";

const EmployeeRight = () => {
  const { data } = useContext(EmailContext);
  const [jobs, setJobs] = useState([]); // All jobs from API
  const [filteredJobs, setFilteredJobs] = useState([]); // Jobs after applying filters
  const [searchQuery, setSearchQuery] = useState(""); // Search input value
  const [jobTypeFilter, setJobTypeFilter] = useState(""); // Job type filter (using "type")

  // Fetch all jobs from the API
  const fetchJob = async () => {
    try {
      const response = await axios.get("https://jobport-kvn5.onrender.com/api/allJobs");
      setJobs(response.data.jobs);
      setFilteredJobs(response.data.jobs); // Initially, all jobs are displayed
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJob();
  }, []);

  // Apply filters whenever searchQuery or jobTypeFilter changes
  useEffect(() => {
    let updatedJobs = [...jobs];

    // Search filter (title, company, skills)
    if (searchQuery) {
      updatedJobs = updatedJobs.filter((job) => {
        const title = (job.title || "").toLowerCase();
        const company = (job.company || "").toLowerCase();
        const skills = (job.skills || []).join(" ").toLowerCase(); // Join skills into a searchable string
        const query = searchQuery.toLowerCase();
        return title.includes(query) || company.includes(query) || skills.includes(query);
      });
    }

    // Job type filter (using "type" field)
    if (jobTypeFilter) {
      updatedJobs = updatedJobs.filter((job) =>
        (job.type || "").toLowerCase() === jobTypeFilter.toLowerCase()
      );
    }

    setFilteredJobs(updatedJobs);
  }, [searchQuery, jobTypeFilter, jobs]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  // Handle job type filter change
  const handleJobTypeChange = (e) => {
    setJobTypeFilter(e.target.value);
  };

  return (
    <div className="lg:w-[80%] w-full pt-8 h-screen px-8 bg-gray-50 overflow-y-auto">
      {/* Header Section */}
      <div className="flex justify-between flex-col items-center">
        <h1 className="text-gray-700 font-semibold text-3xl mb-2">
          Welcome {data?.fname}
        </h1>
        <h2 className="head font-medium text-center md:mx-auto md:w-[60%] text-2xl md:text-3xl">
          Explore Limitless Career Opportunities with Hirrd
        </h2>
      </div>
      <div className="relative w-full">
        <div className="absolute right-4 -top-32">
          <img
            src={data?.profilePic||"https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1742232869~exp=1742236469~hmac=88fc273d87c0af75de9bb5d99b7bd507ad0b38fcb2c0aa8f4fa5ebea222f7b6d&w=826"}
            alt="Profile"
            className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-10">
        <div className="relative flex justify-center w-[28rem]">
          <form onSubmit={handleSearchSubmit} className="w-full relative">
            <input
              type="text"
              placeholder="Search by title, company, or skills"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 text-gray-600 placeholder-gray-400 border rounded-lg focus:outline-none focus:ring-[#27272a] focus:border-[#27272a]"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#27272a] text-white p-2 rounded-lg hover:bg-[#27272a]"
            >
              <IoSearchOutline className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mt-8">
        <select
          value={jobTypeFilter}
          onChange={handleJobTypeChange}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-[#27272a] focus:border-[#27272a] text-gray-600"
        >
          <option value="">All Job Types</option>
          <option value="full-time">Full Time</option>
          <option value="part-time">Part Time</option>
          <option value="contract">Contract</option>
        </select>
      </div>

      {/* Job Listings */}
      <div className="mt-8 flex flex-wrap gap-5 mb-8">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <JobCard key={job._id} job={job} />
          ))
        ) : (
          <p className="text-gray-600">No jobs match your criteria.</p>
        )}
      </div>
    </div>
  );
};

export default EmployeeRight;