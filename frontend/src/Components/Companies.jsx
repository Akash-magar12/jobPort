import { RiUpload2Fill } from "react-icons/ri";
import sign from "../assets/home/signup.webp";
const Companies = () => {
  return (
    <div className=" md:px-10 py-2 w-full flex   h-[80vh]">
      <div className="w-1/2 h-full ">
        <img className="w-full h-full object-cover" src={sign} alt="" />
      </div>
      <div className="w-1/2 h-full bg-blue-500 flex justify-center flex-col gap-4 text-white px-10 py-6 ">
        <h2 className="text-4xl font-semibold">
          Job hunting made easy—upload your resume and get hired faster with
          Hirrd!
        </h2>
        <p>
          Tired of endlessly searching job portals? Hirrd makes job hunting
          stress-free by delivering the right jobs straight to you. Upload your
          CV today and let recruiters find you instead. The job you’ve been
          looking for is just a click away!
        </p>
        <button className="flex bg-white w-fit text-black px-3 py-2 rounded items-center gap-2">
          <span>
            <RiUpload2Fill />
          </span>
          Upload your CV
        </button>
      </div>
    </div>
  );
};

export default Companies;
