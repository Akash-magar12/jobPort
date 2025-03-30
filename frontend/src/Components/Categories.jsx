import { useState } from "react";
import { BsBuilding } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdExpandMore, MdWork } from "react-icons/md";
import { TbLayoutDashboard } from "react-icons/tb";

const Categories = () => {
  const [activeFilter, setActiveFilter] = useState(null);

  const filters = [
    {
      label: "Job Type",
      icon: <MdWork className="w-4 h-4" />,
      options: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    },
    {
      label: "Domain",
      icon: <TbLayoutDashboard className="w-4 h-4" />,
      options: ["Technology", "Marketing", "Design", "Sales", "Finance"],
    },
    {
      label: "Role Type",
      icon: <FaGraduationCap className="w-4 h-4" />,
      options: ["Junior", "Mid-level", "Senior", "Lead", "Manager"],
    },
    {
      label: "Experience Level",
      icon: <MdWork className="w-4 h-4" />,
      options: ["0-2 years", "2-5 years", "5-8 years", "8+ years"],
    },
    {
      label: "Company",
      icon: <BsBuilding className="w-4 h-4" />,
      options: ["Startups", "Mid-size", "Enterprise", "Fortune 500"],
    },
    {
      label: "Location",
      icon: <IoLocationOutline className="w-4 h-4" />,
      options: ["Remote", "Hybrid", "On-site"],
    },
  ];

  return (
    <div className="mt-4">
      <div className="flex items-center flex-wrap gap-2">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                ${
                  activeFilter === null
                    ? "bg-purple-100 text-purple-700"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                }`}
          onClick={() => setActiveFilter(null)} // Fix: set to null instead of false
        >
          All
        </button>

        {filters.map((filter) => (
          <div key={filter.label} className="relative">
            <button
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      activeFilter === filter.label
                        ? "bg-purple-100 text-purple-700"
                        : "bg-gray-50 text-gray-700 hover:bg-gray-100"
                    }`}
              onClick={() =>
                setActiveFilter(
                  activeFilter === filter.label ? null : filter.label
                )
              }
            >
              {filter.icon}
              {filter.label}
              <MdExpandMore
                className={`w-4 h-4 transition-transform ${
                  activeFilter === filter.label ? "rotate-180" : ""
                }`}
              />
            </button>

            {activeFilter === filter.label && (
              <div className="absolute z-10 mt-2 w-56 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="p-2">
                  {filter.options.map((option) => (
                    <div className="flex items-center " key={option}>
                      <input type="checkbox" />

                      <button className="block w-full text-left px-2 py-2 text-sm text-gray-700 rounded-md hover:bg-purple-50 hover:text-purple-700">
                        {option}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
