import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // Import axios
import sign from "../assets/home/signup.webp";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EmailContext } from "../Components/Context";

const Verify = () => {
  const [OTP, setOTP] = useState("");
  const { email } = useContext(EmailContext);

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `https://jobport-kvn5.onrender.com/api/verify-otp/${email}`,
        { OTP }
      );

      if (response.status === 200) {
        navigate("/reset");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="flex  h-[80vh] mt-10  px-4 md:px-10 py-2 shadow-2xl">
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
      <div className="hidden md:flex w-1/2 items-center justify-center ">
        <img
          className="w-full h-full object-cover object-center"
          src={sign}
          alt=""
        />
      </div>

      {/* Right Side */}
      <div className="flex justify-center items-center w-full md:w-1/2 bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-[#27272a]">Verify OTP</h2>
          <form onSubmit={handleSubmit}>
            {/* OTP input */}
            <div className="mb-4">
              <input
                type="text"
                name="OTP"
                value={OTP}
                onChange={(e) => setOTP(e.target.value)}
                placeholder="Enter your OTP"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none  focus:border-[#27272a]"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full bg-[#27272a] hover:bg-[#27272ae3] text-white font-bold py-2 px-4 rounded-lg"
            >
              Submit
            </button>
          </form>
          <div className="mt-4 text-center">
            <span className="text-gray-600">{"Didn't receive the OTP?"}</span>
            <Link to="/forgot" className="text-[#27272a] hover:underline ml-2">
              Resend OTP
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
