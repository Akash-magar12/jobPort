import logo from "../assets/logo/logodark.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex w-full  px-4 md:px-10 py-2 justify-between items-center">
      <Link to="/">
        <img className="w-28" src={logo} alt="" />
      </Link>
      <div className="flex gap-4">
        <Link
          to="/signin"
          className="text-white bg-black px-4 py-1 rounded-full"
        >
          Log In
        </Link>
        <Link
          to="/signup"
          className="border border-[#27272a] px-2 py-1 rounded-full"
        >
          Register Now
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
