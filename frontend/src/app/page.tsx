import HeroSection from "@/components/home/HeroSection";
import ParralaxSection from "@/components/home/ParralaxSection"

import AboutSection from "@/components/home/AboutSection";
import TestimonySection from "@/components/home/TestimonySection";
import BackgroundGradient from "@/components/ui/background-gradient";


export default function HomePage() {

  
  return (
    <section className = "relative w-screen min-h-[calc(100vh-5rem)]">


      <div className = "relative overflow-hidden">
        <BackgroundGradient />
        
        <HeroSection/>

        <ParralaxSection/>
      </div>

      <AboutSection/>

      <TestimonySection/>
      
    </section>
  );
}