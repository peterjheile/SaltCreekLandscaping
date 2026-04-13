import HeroHeader from "@/components/ui/hero-header"

import {getHomePageHeroContent} from "@/features/marketing/home/api"




export default async function HeroSection() {

  const HomepageHeroContent = await getHomePageHeroContent();


  return (
    <div className = "relative">


    <HeroHeader heroContent={HomepageHeroContent}/>

    
    </div>
  );
}
