import { GoBookmarkSlashFill } from "react-icons/go";

const Savedjobs = () => {
  return (
    <div className="lg:w-[80%]  w-full pt-8 h-screen px-8 bg-white">
      <h3 className="text-2xl font-semibold">Saved Jobs</h3>
      <div className="w-full h-[80%] gap-2 flex justify-center items-center flex-col">
        <span className="text-4xl md:text-5xl lg:text-6xl cursor-pointer">
          <GoBookmarkSlashFill />
        </span>
        <h2 className="text-2xl md:text-3xl lg:text-4xl cursor-pointer">
          No Saved Jobs
        </h2>
      </div>
    </div>
  );
};

export default Savedjobs;
