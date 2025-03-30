import Companies from "../Components/Companies";
import Footer from "../Components/Footer";
import Hero from "../Components/Hero";
import PlatForm from "../Components/PlatForm";
import Review from "../Components/Review";
import Sponsors from "../Components/Sponser";

const Home = () => {
  return (
    <div className="w-full min-h-screen mt-4">
      <Hero />
      <PlatForm />
      <Review />
      <Companies />
      <Sponsors />
      <Footer />
    </div>
  );
};

export default Home;
