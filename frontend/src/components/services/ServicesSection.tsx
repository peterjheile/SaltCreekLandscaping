import * as React from "react";
import ServicesPage from "@/components/services/ServicesPage";
import { getActiveServiceHeroContent } from "@/features/marketing/services/api";


export default async function ServicesRoute() {
  const serviceHeroContent = await getActiveServiceHeroContent();

  return (

      <ServicesPage
        heroContent={serviceHeroContent}
      />

  );
}