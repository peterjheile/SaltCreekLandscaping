import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import TestimonySection from "@/components/home/TestimonySection";


export default function HomePage() {

  
  return (
    <section className = "relative h-fit w-screen">
      
      <HeroSection/>

      <AboutSection/>

      <TestimonySection/>
      

      {/* <div className = "relative h-[1000px]">
        MORE WILL GO HERE
      </div> */}
      
    </section>
  );
}