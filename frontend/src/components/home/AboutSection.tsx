import { StickyScroll } from "@/components/ui/sticky-scroll-reveal"
import { fetchFeatureCards } from "@/features/marketing/api"

export default async function AboutSection (){

  const stickyScrollContent = await fetchFeatureCards();


    return (
      <StickyScroll content = {stickyScrollContent}/>
    )
}
