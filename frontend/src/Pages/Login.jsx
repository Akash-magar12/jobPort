import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import sign from "../assets/home/signup.webp";
import axios from "axios";
import { EmailContext } from "../Components/Context";
import { toast } from "react-toastify";

const Login = () => {
  const [password, setPassword] = useState("");
  const { email, setEmail } = useContext(EmailContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/signin", {
        email,
        password,
      });

      toast.success(response.data.message);
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", user.role);
      localStorage.setItem("id", user.id);

      // Redirect based on role
      if (user.role === "employer") {
        navigate("/employer"); // Employer dashboard
      } else {
        navigate("/employee"); // Employee dashboard
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.data) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="flex h-[80vh] px-4 md:px-10 py-2 mt-10 shadow-2xl">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          className="w-full rounded h-full object-cover object-center"
          src={sign}
          alt=""
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-[#27272a]">Login</h2>

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email on change
                placeholder="Email"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#27272a]"
                required
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password on change
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#27272a]"
                required
              />
            </div>

            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  className="h-5 w-5 text-[#27272a]"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </div>
              <Link to="/forgot" className="text-[#27272a] hover:underline">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#27272a] hover:bg-[#27272ae3] text-white font-bold py-2 px-4 rounded-lg"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Logging in..." : "Login"} {/* Show loading text */}
            </button>

            <div className="mt-4 text-center">
              <span className="text-gray-600">OR</span>
            </div>

            {/* Social login buttons (optional) */}
            {/* <div className="flex gap-4 mt-4">
              <button
                type="button"
                className="w-1/2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Login with Google
              </button>
              <button
                type="button"
                className="w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Login with Facebook
              </button>
            </div> */}
          </form>

          <div className="mt-4 text-center">
            <span className="text-gray-600">{`Don't have an account?`}</span>
            <Link to="/signup" className="text-[#27272a] hover:underline ml-2">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
