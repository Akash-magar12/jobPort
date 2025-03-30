/* eslint-disable react/prop-types */

const PlatformCard = ({ category }) => {
  return (
    <div className="p-6 rounded-xl cursor-pointer shadow-md hover:scale-105 transition-all duration-300">
      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4">
        <span className={category.color}>{category.icon}</span>
      </div>
      <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
      <p className="text-sm">{category.jobs} Jobs Available</p>
    </div>
  );
};

export default PlatformCard;
