import FAQsAll from "@/components/faqs/FaqsAll"
import { getActiveFAQHeroContent, getFAQCategories } from "@/features/marketing/faqs/api";



export default async function FaqsSections(){

    const FaqHeroContent = await getActiveFAQHeroContent();
    const FaqCategories = await getFAQCategories();


    return (
        <FAQsAll categories = {FaqCategories} heroContent = {FaqHeroContent}/>
    )

}