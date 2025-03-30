import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo/logo.png";
import { IoMail } from "react-icons/io5";
import { FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { employer } from "../utils/option";

const JobMakerLeft = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add any initialization logic here if needed
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("id");
    navigate("/");
  };

  const socialIcons = [
    { icon: <FaGithub />, link: "https://github.com" },
    { icon: <FaInstagram />, link: "https://instagram.com" },
    { icon: <FaTwitter />, link: "https://twitter.com" },
    { icon: <IoMail />, link: "mailto:support@example.com" },
  ];

  return (
    <div className="fixed top-0 left-0 w-full md:w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-lg flex flex-col md:static md:block">
      {/* Logo Section */}
      <div className="flex items-center justify-center md:justify-start p-4 border-b border-gray-700">
        <img src={logo} alt="Logo" className="w-24 md:w-32" />
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {employer.map((o, index) => (
            <li key={index}>
              <Link
                to={`/employer/${o.path}`}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-700 hover:text-blue-300 transition-all duration-200"
              >
                <span className="text-xl">{o.icon()}</span>
                <span className="text-sm font-medium">{o.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="px-4 py-6 border-t border-gray-700">
        {/* Social Icons */}
        <div className="flex justify-center md:justify-start gap-4 mb-4">
          {socialIcons.map((item, index) => (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400 transition-colors duration-200"
            >
              {item.icon}
            </a>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full p-2 text-sm font-medium text-center bg-red-600 rounded-lg hover:bg-red-700 transition-colors duration-200"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default JobMakerLeft;
