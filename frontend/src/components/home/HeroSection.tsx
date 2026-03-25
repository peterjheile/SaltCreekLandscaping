import { HeroParallax } from "@/components/ui/hero-parallax"
import { fetchParallaxCards, getHeroContent } from "@/features/marketing/api"


export default async function HeroSection() {
  const products = await fetchParallaxCards();
  const heroContent = await getHeroContent();

  return (
    <HeroParallax
      title={heroContent.title}
      description={heroContent.subtitle}
      products={products}
    />
  );
}
