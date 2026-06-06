import ServicesRoute from "@/components/services/ServicesSection";

export const metadata = {
  title: "Services | Salt Creek Landscaping",
  description:
    "Explore Salt Creek Landscaping's landscaping, lawn care, hardscaping, and tree services in Bloomington, Indiana and surrounding areas.",
};

export default function ServicesPage(){


    return (
        <div className = "relative w-screen min-h-[calc(100vh-5rem)]">

            
            <ServicesRoute/>
        </div>
    )

}