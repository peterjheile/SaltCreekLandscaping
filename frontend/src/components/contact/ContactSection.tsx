import ContactAll from "@/components/contact/ContactAll"
import { getActiveContactHeroContent } from "@/features/marketing/contact/api"

export default async function ContactSection() {

    const ContactHeroContent = await getActiveContactHeroContent();


    return (
        <ContactAll heroContent = {ContactHeroContent}/>
    )

}