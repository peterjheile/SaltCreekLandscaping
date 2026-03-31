import * as React from "react";

import ServicesAccordion from "@/components/services/ServicesAccordion"
import { getServiceCategories } from "@/features/services/api";
import ServicesHero from "@/components/services/ServicesHero"



export default async function (){

    const services = await getServiceCategories();

    return (
        <div className = "relative max-w-6xl mx-auto pb-20">


            <ServicesHero/>
            <ServicesAccordion services = {services} />

        </div>

    )

}