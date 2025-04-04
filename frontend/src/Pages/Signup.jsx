import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import sign from "../assets/home/signup.webp";

function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await axios.post(
        "https://jobport-kvn5.onrender.com/api/signup",
        data
      );
      toast.success(response.data.message);
      navigate("/signin");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="flex h-[80vh] px-4 md:px-10 py-2 mt-10 shadow-2xl">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          className="w-full h-full object-cover object-center"
          src={sign}
          alt="signup"
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-[#27272a]">Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-4">
              <input
                type="text"
                name="fname"
                placeholder="First Name"
                className="w-1/2 px-3 py-2 border rounded-lg"
              />
              <input
                type="text"
                name="lname"
                placeholder="Last Name"
                className="w-1/2 px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            {/* Role Selection */}
            <div className="mb-4">
              <select
                name="role"
                className="w-full px-3 py-2 border rounded-lg"
              >
                <option value="employee">Employee</option>
                <option value="employer">Employer</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-[#27272a] hover:bg-[#27272ae3] text-white font-bold py-2 px-4 rounded-lg"
            >
              Sign Up
            </button>
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account?</span>
              <Link
                to="/signin"
                className="text-[#27272a] hover:underline ml-2"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
