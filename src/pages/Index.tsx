import Categories from "@/components/Categories";
import FeaturedCars from "@/components/FeaturedCars";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/Newsletter";
import Showcase from "@/components/Showcase";
import Testimonials from "@/components/Testimonials";
import WhyUs from "@/components/WhyUs";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <FeaturedCars />
        <Categories />
        <WhyUs />
        <Showcase />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
