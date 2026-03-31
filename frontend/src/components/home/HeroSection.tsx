import HeroSectionWithParallax from "@/components/ui/hero-parallax"
import { fetchParallaxCards, getHeroContent } from "@/features/marketing/api"
import HeroHeader from "@/components/ui/hero-header"
import BackgroundGradient from "@/components/ui/background-gradient";

export default async function HeroSection() {
  const products = await fetchParallaxCards();
  const heroContent = await getHeroContent();

  return (
    <div className = "relative">

    <BackgroundGradient/>

    <HeroSectionWithParallax products={products}/>
    
    </div>
  );
}
