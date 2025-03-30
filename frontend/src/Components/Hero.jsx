import { IoSearchOutline } from "react-icons/io5";
import { useState } from "react";
import hero from "../assets/home/hero.webp";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div
      style={{
        backgroundImage: `url(${hero})`,
      }}
      className="relative flex bg-cover bg-center h-[76vh] md:h-[80vh] w-full flex-col items-center justify-center gap-4 md:gap-8 rounded-lg px-4 md:px-8"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />

      <div className="relative z-10 text-center">
        <h1 className="mb-2 text-3xl font-bold text-white md:text-5xl lg:text-6xl">
          Get the <span className=" text-blue-500">Right Job</span>
        </h1>
        <h2 className="text-3xl font-bold text-white md:text-5xl lg:text-6xl">
          You Deserve
        </h2>
      </div>

      <p className="relative z-10 text-center text-sm md:text-base text-gray-200">
        180,570 jobs listed here! Your dream job is waiting
      </p>

      <form
        onSubmit={handleSearch}
        className="relative z-10 w-full max-w-3xl px-4 md:px-0"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search jobs by title, company, or keywords..."
            className="w-full rounded-lg border border-gray-300 bg-white/90 px-4 py-3 pr-12 text-gray-700 placeholder-gray-500 backdrop-blur-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40"
          />
          <button
            type="submit"
            className="absolute right-2 rounded-lg bg-blue-500 p-2 text-lg text-white transition-all hover:from-blue-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 md:p-2.5"
          >
            <IoSearchOutline className="h-5 w-5" />
          </button>
        </div>

        {/* Popular Searches */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm text-white/90">
          <span>Popular:</span>
          {["Remote", "Full-time", "Engineering", "Design", "Marketing"].map(
            (term) => (
              <button
                key={term}
                onClick={() => setSearchQuery(term)}
                className="rounded-full bg-white/10 px-3 py-1 backdrop-blur-sm hover:bg-white/20 transition-all"
              >
                {term}
              </button>
            )
          )}
        </div>
      </form>
    </div>
  );
};

export default Hero;
