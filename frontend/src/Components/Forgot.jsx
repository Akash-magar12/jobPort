import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import sign from "../assets/home/signup.webp";
import { toast } from "react-toastify";
import { EmailContext } from "./Context";

const Forgot = () => {
  const { email, setEmail } = useContext(EmailContext);

  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post(
        "https://jobport-kvn5.onrender.com/api/forgot-password",
        { email }
      );

      if (response.data.message === "User not found") {
        toast.error("User not found");
      } else {
        toast.success(response.data.message);
        navigate("/verify"); // Navigate to verification page
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response.data.message);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="flex  h-[80vh] mt-10  px-4 md:px-10 py-2 shadow-2xl">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          className="w-full h-full object-cover object-center"
          src={sign}
          alt=""
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-[#27272a]">
            Forgot Password
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none  focus:border-[#27272a]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#27272a] hover:bg-[#27272ae3] text-white font-bold py-2 px-4 rounded-lg"
              disabled={loading} // Disable button while loading
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">Remember your password?</span>
            <Link to="/signin" className="text-[#27272a] hover:underline ml-2">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot;
