import { IoSearchOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import Categories from "../Components/Categories";

const Filter = () => {
  const [search, setSearch] = useState("");
  return (
    <div className="lg:w-[80%]  w-full pt-8 h-screen px-8 bg-white">
      <div className="flex items-center border gap-4 w-[30rem] px-3 py-2 rounded-full">
        <span className="text-xl cursor-pointer">
          <IoSearchOutline />
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none border-none"
          type="text"
          placeholder="Enter your role here"
        />
        {search && (
          <span
            onClick={() => setSearch("")}
            className="text-xl cursor-pointer"
          >
            <IoMdClose />
          </span>
        )}
      </div>
      <Categories />
    </div>
  );
};

export default Filter;
