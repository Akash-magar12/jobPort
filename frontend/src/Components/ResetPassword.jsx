import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles
import axios from "axios"; // Import axios
import sign from "../assets/home/signup.webp";
import { EmailContext } from "./Context";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { email } = useContext(EmailContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the passwords match
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/reset-password/${email}`,
        {
          newPassword,
        }
      );

      if (response.status === 200) {
        toast.success("Password reset successfully!");

        navigate("/signin");
      } else {
        toast.error(
          response.data.message || "An error occurred. Please try again."
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <div className="flex h-[80vh] mt-10  px-4 md:px-10 py-2 shadow-2xl">
      {/* Left Side */}
      <div className="hidden md:flex w-1/2 items-center justify-center ">
        <img
          className="w-full h-full object-cover object-center"
          src={sign}
          alt="Sign Up"
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-[#27272a]">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#27272a]"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-[#27272a]"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#27272a] hover:bg-[#27272ae3] text-white font-bold py-2 px-4 rounded-lg"
            >
              Reset Password
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

export default ResetPassword;
