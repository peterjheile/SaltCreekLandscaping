import { StickyScroll } from "@/components/ui/sticky-scroll"

import {getAboutModules} from "@/features/marketing/home/api"

export default async function AboutSection() {

  const aboutContentModules = await getAboutModules();

  return <StickyScroll content={aboutContentModules} />;
}