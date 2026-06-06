import HeroSection from "@/components/home/HeroSection";
import ParralaxSection from "@/components/home/ParralaxSection"

import AboutSection from "@/components/home/AboutSection";
import TestimonySection from "@/components/home/TestimonySection";
import BackgroundGradient from "@/components/ui/background-gradient";

export const metadata = {
  title: "Salt Creek Landscaping | Bloomington, IN Landscaping & Hardscaping",
  description:
    "Salt Creek Landscaping is a local, owner-operated company based in Bloomington, Indiana. We handle lawn care, landscaping, tree work, and hardscaping for homeowners who want their property done right.",
};

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