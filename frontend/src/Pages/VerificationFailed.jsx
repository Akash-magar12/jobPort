import { FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

const VerificationFailed = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white  px-4 md:px-10 py-2">
      <div className="w-full max-w-md text-center">
        <FiXCircle className="text-red-500 text-6xl mb-4 mx-auto" />
        <h2 className="text-3xl font-bold mb-6 text-red-500">
          Verification Failed
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Unfortunately, your verification was not successful. Please try again.
        </p>
        <Link
          to="/verify"
          className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg inline-block"
        >
          Try Again
        </Link>
      </div>
    </div>
  );
};

export default VerificationFailed;
