import { HiMenuAlt2 } from "react-icons/hi";
import DashLeft from "./EmployeeLeft";
import { options } from "../utils/option";
import { FaGithub, FaHeadphones, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo/logo.png";
import { IoMail } from "react-icons/io5";
import { SlQuestion } from "react-icons/sl";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { Link, Outlet } from "react-router-dom";

const Employee = () => {
  const [side, setSide] = useState(false);
  const open = () => {
    setSide(true);
  };

  const close = () => {
    setSide(false);
  };
  let icons = [
    {
      icon: <FaGithub />,
    },
    {
      icon: <FaInstagram />,
    },
    {
      icon: <FaTwitter />,
    },
    {
      icon: <IoMail />,
    },
  ];
  return (
    <div className="min-h-screen h-screen  flex">
      <span
        onClick={open}
        className="text-2xl fixed md:hidden transition-all left-0 pl-2 mt-5 cursor-pointer"
      >
        <HiMenuAlt2 />
      </span>
      <DashLeft />
      <Outlet />
      <div
        className={`fixed ${
          side ? "lg:[20%] " : "left-[-80%]"
        }  md:hidden  pt-4 text-white h-screen bg-[#27272a] transition-all`}
      >
        <div className="flex px-6 justify-between items-center   ">
          <img className="w-28" src={logo} alt="" />
          <span
            onClick={close}
            className="text-2xl transition-all cursor-pointer"
          >
            <IoMdClose />
          </span>
        </div>
        <div className="flex flex-col    justify-between px-6 mt-8 gap-3 ">
          {options.map((o, i) => (
            <Link
              to={`/dashboard/${o.name}`}
              key={i}
              className="w-full cursor-pointer p-3   hover:bg-[#a1a1a4a6] transition-all rounded-md flex  items-center gap-3 "
            >
              <span className="text-xl">{<o.icon />}</span>
              <p>{o.name}</p>
            </Link>
          ))}
          <div className="mt-16 flex flex-col border-b gap-3">
            <div className="w-full cursor-pointer p-3   hover:bg-[#a1a1a4a6] transition-all rounded-md flex  items-center gap-3 ">
              <span className="text-xl">
                <FaHeadphones />
              </span>
              <p>Contact Us</p>
            </div>
            <div className="w-full cursor-pointer p-3 mb-4   hover:bg-[#a1a1a4a6] transition-all rounded-md flex  items-center gap-3 ">
              <span className="text-xl">
                <SlQuestion />
              </span>
              <p>Having issues</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 h-full mt-2">
            {icons.map((v, i) => (
              <span className="text-xl" key={i}>
                {v.icon}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
