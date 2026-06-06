import ServicesRoute from "@/components/services/ServicesSection";

export const metadata = {
  title: "Landscaping & Hardscaping Services | Salt Creek Landscaping",
  description:
    "Salt Creek Landscaping is a local, owner-operated company based in Bloomington, Indiana. We handle lawn care, landscaping, tree work, and hardscaping for homeowners who want their property done right.",
};

export default function ServicesPage(){


    return (
        <div className = "relative w-screen min-h-[calc(100vh-5rem)]">

            
            <ServicesRoute/>
        </div>
    )

}