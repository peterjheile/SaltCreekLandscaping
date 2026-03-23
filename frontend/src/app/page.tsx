import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";


export default function HomePage() {

  
  return (
    <section className = "w-screen">
      <HeroSection/>

      <AboutSection/>

      <div className = "h-[1000px]">
        MORE WILL GO HERE
      </div>
      
    </section>
  );
}