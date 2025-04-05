import { useState } from "react";
import img1 from "../assets/avatar/img1.webp";
import img2 from "../assets/avatar/img2.webp";
import img3 from "../assets/avatar/img3.webp";
import img4 from "../assets/avatar/img4.webp";
import img5 from "../assets/avatar/img5.webp";

const Review = () => {
  const reviews = [
    {
      id: 0,
      img: img1,
      name: "Emily S.",
      role: "Digital Marketer",
      review:
        "Hirrd changed my career path for the better! Within weeks of signing up, I found a position that perfectly matched my skills and goals. The platform is incredibly easy to use!",
    },
    {
      id: 1,
      img: img2,
      name: "Ava M.",
      role: "Content Strategist",
      review:
        "Thanks to Hirrd, I landed my dream job in digital marketing. The application process was seamless, and their resources helped me polish my resume and interview skills. Highly recommend!",
    },
    {
      id: 2,
      img: img3,
      name: " Ethan T.",
      role: "Software Developer",
      review:
        "After months of struggling to find a job, Hirrd made it possible. Their advanced search filters and instant alerts connected me with the right opportunities. I couldn’t be happier with my new role!",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      name: "Sophia G.",
      role: "Project Manager",
      review:
        "Hirrd is the best job platform I’ve ever used. I not only found a great job but also felt supported throughout the process. The platform feels modern and efficient. A big thumbs up!",
    },
    {
      id: 4,
      img: img4,
      name: "Lily P.",
      role: "UX Designer",
      review:
        "I owe my current position to Hirrd. It’s a game-changer for job seekers. The personalized job recommendations and company insights were incredibly helpful in making the right choice!",
    },
    {
      id: 5,
      img: img5,
      name: "Evelyn R.",
      role: "Frontend Developer",
      review:
        "I was struggling to find a job for months, but Hirrd made it so easy! Their job-matching algorithm is super accurate, and within days, I got interview calls. I’m now working at a fantastic company!",
    },
  ];
  const [selected, setSelected] = useState(reviews[0]);

  return (
    <div className="   px-4 0 md:px-10 py-2 mt-10 w-full h-[80vh] ">

    <div className="  md:px-10 mt-10 py-2 w-full h-[80vh] ">

      <div className="flex flex-col gap-1 ">
        <h2 className="text-4xl text-center font-semibold">
          <span className="text-[#60A5FA]">Reviews</span> of people who have{" "}
        </h2>
        <h2 className="text-4xl text-center font-semibold">
          Found jobs through Hirrd
        </h2>
      </div>
      <div>
        <div className="mt-10 flex justify-center">
          <div className="w-[45rem] cursor-pointer min-h-60 p-10 gap-3 flex flex-col justify-center items-center  bg-white shadow-md">
            <p className="text-center font-thin text-gray-700">
              {selected.review}
            </p>
            <div>
              <p className="text-center font-medium">{selected.name}</p>
              <p className="text-center font-thin text-gray-700">
                {selected.role}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-6">
          {reviews.map((person) => (
            <div
              onClick={() => setSelected(person)}
              key={person.id}
              className={`h-16 w-16 hover:scale-110  cursor-pointer transition-all rounded-full  overflow-hidden  ${
                person.id === selected.id
                  ? "border-2 border-blue-400 "
                  : "border-gray-300"
              }`}
            >
              <img
                className="w-full object-top h-full object-cover"
                src={person.img}
                alt={person.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Review;
