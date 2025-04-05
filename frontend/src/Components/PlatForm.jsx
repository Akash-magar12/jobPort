import {
  BsChatSquareText,
  BsCode,
  BsPeople,
  BsWallet2,
  BsShield,
  BsPersonLinesFill, // Replaced BsHandshake
  BsHeadset,
  BsKanban,
} from "react-icons/bs";
import PlatformCard from "./PlatformCard";

const PlatForm = () => {
  const categories = [
    {
      icon: <BsChatSquareText className="w-6 h-6" />,
      title: "Marketing & Communication",
      jobs: 58,
      color: "text-pink-500",
    },
    {
      icon: <BsCode className="w-6 h-6" />,
      title: "Design & Development",
      jobs: 120,
      color: "text-indigo-500",
    },
    {
      icon: <BsPeople className="w-6 h-6" />,
      title: "Human Research & Development",
      jobs: 199,
      color: "text-blue-600",
    },
    {
      icon: <BsWallet2 className="w-6 h-6" />,
      title: "Finance Management",
      jobs: 237,
      color: "text-amber-500",
    },
    {
      icon: <BsShield className="w-6 h-6" />,
      title: "Armforce Guide & Security",
      jobs: 150,
      color: "text-purple-500",
    },
    {
      icon: <BsPersonLinesFill className="w-6 h-6" />, // Updated icon
      title: "Business & Consulting",
      jobs: 47,
      color: "text-pink-400",
    },
    {
      icon: <BsHeadset className="w-6 h-6" />,
      title: "Customer Support Care",
      jobs: 80,
      color: "text-teal-500",
    },
    {
      icon: <BsKanban className="w-6 h-6" />,
      title: "Project Management",
      jobs: 87,
      color: "text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen bg-white mt-10 px-4 md:px-0  md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Job Categories
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find your dream job from our wide range of categories. We have
            opportunities across various industries and roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <PlatformCard key={index} category={category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlatForm;
