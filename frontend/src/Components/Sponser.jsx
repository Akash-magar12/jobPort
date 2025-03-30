import air from "../assets/icons/airnb.svg";
import walmart from "../assets/icons/walmart.svg";
import dropbox from "../assets/icons/dropbox.svg";
import slack from "../assets/icons/slack.svg";
import discord from "../assets/icons/discord.svg";
import dribble from "../assets/icons/dribble.svg";
import behance from "../assets/icons/behance.svg";
import pinterest from "../assets/icons/pinterest.svg";

const Sponsors = () => {
  const companies = [
    { name: "Airbnb", img: air },
    { name: "Walmart", img: walmart },
    { name: "Dropbox", img: dropbox },
    { name: "Slack", img: slack },
    { name: "Discord", img: discord },
    { name: "Dribbble", img: dribble },
    { name: "Pinterest", img: pinterest },
    { name: "Behance", img: behance },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-10">
      <h2 className="text-lg md:text-xl font-medium text-gray-700">
        More than{" "}
        <span className="text-blue-600 font-semibold">20,000 companies</span>{" "}
        sponsor with us
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-16 my-16">
        {companies.map((company, index) => (
          <div
            className="flex justify-center flex-col items-center gap-4"
            key={index}
          >
            <img
              src={company.img}
              alt={company.name}
              className="h-10 md:h-12 opacity-70 hover:opacity-100 transition"
            />
            <h2>{company.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sponsors;
