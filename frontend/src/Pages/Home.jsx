import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import PlatForm from "../Components/PlatForm";
import Review from "../Components/Review";
import Sponsors from "../Components/Sponser";

const Home = () => {
  return (
    <div className="w-full min-h-screen ">
      <Hero />
      <PlatForm />
      <Review />
      <Sponsors />
      <Footer />
    </div>
  );
};

export default Home;
