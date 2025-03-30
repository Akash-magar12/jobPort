import { FaUserAlt } from "react-icons/fa"; // User Icon from Font Awesome
import { MdBusiness } from "react-icons/md"; // Building Icon from Material Design
import { MdArrowForward } from "react-icons/md"; // Arrow Icon from Material Design

const Role = () => {
  return (
    <div className="flex justify-center items-center h-[80vh] mt-10 shadow-2xl bg-gray-50">
      <div className="w-full max-w-4xl p-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome to JobPortal
          </h1>
          <p className="text-xl text-gray-600">
            Select your role to get started
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {/* Job Seeker Card */}
          <button className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#27272A]">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center">
              <MdArrowForward className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-[#27272A] rounded-full flex items-center justify-center">
                <FaUserAlt className="w-10 h-10 text-white" />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Job Seeker
                </h2>
                <p className="text-gray-600">
                  Find your dream job from thousands of listings
                </p>
              </div>

              <span
                className="px-6 py-2 bg-[#27272A] text-white rounded-full font-medium 
                             group-hover:bg-[#27272A] transition-colors"
              >
                Get Started
              </span>
            </div>
          </button>

          {/* Job Provider Card */}
          <button className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-[#27272A]">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#27272A] flex items-center justify-center">
              <MdArrowForward className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className="flex flex-col items-center space-y-6">
              <div className="w-20 h-20 bg-[#27272A] rounded-full flex items-center justify-center">
                <MdBusiness className="w-10 h-10 text-white" />
              </div>

              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Job Provider
                </h2>
                <p className="text-gray-600">
                  Post jobs and find the perfect candidates
                </p>
              </div>

              <span
                className="px-6 py-2 bg-[#27272A] text-white rounded-full font-medium 
                             group-hover:bg-[#27272A] transition-colors"
              >
                Get Started
              </span>
            </div>
          </button>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500">
            Already have an account?
            <a
              href="#"
              className="text-[#27272A] hover:text-[#27272A] ml-2 font-medium"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Role;
