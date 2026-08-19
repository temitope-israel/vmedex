import Hero from "@/components/sections/Hero";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesOverview from "@/components/sections/ServicesOverview";
import FeaturedWork from "@/components/sections/FeaturedWork";
import TestimonialsTeaser from "@/components/sections/TestimonialsTeaser";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutTeaser />
      <ServicesOverview />
      <FeaturedWork />
      <TestimonialsTeaser />
    </>
  );
}
