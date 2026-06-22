import Hero from "@/features/home/hero/Hero";
import About from "@/features/home/about/About";
import Testimonials from "@/features/home/testimonials/Testimonials";
import Expertise from "@/features/home/expertise/Expertise";
import Services from "@/features/home/services/Services";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Testimonials />
      <Expertise />
      <Services />
    </>
  );
};

export default HomePage;