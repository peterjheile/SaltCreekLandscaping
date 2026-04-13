import * as React from "react";
import { getServiceCategories } from "@/features/services/api";
import ServicesPage from "@/components/services/ServicesPage";
import { getActiveServiceHeroContent } from "@/features/marketing/services/api";

export default async function ServicesRoute() {
  const services = await getServiceCategories();
  const serviceHeroContent = await getActiveServiceHeroContent();

  return <ServicesPage services={services} heroContent={serviceHeroContent}/>;
}