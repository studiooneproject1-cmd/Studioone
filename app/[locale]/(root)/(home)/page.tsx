import React from "react";
import Section from "@/components/sections/section1";
import OurVision from "@/components/page-sections/our-vision";
import ContactUs from "@/components/page-sections/contact-us";
import OurServices from "@/components/page-sections/our-services";
import MissionVision from "@/components/page-sections/mission-vision";
import Image1 from "@/public/hero-overlay.png";
import Image2 from "@/public/separator-overlay.png";
import WhatsNew from "@/components/page-sections/whats-new";
import OurProcess from "@/components/page-sections/our-process";
import SwiperComponent from "@/components/swiper/swiper";
import { getSlidersByLocale } from "@/app/models/db/lib/services/sliders";
import { getServicesByLocale } from "@/app/models/db/lib/services/services";
import { getPostByLocale } from "@/app/models/db/lib/services/posts";
import { getProjectsByLocale } from "@/app/models/db/lib/services/projects";
import { PAGE_METADATA } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
  };
}

export const generateMetadata = () => {
  return PAGE_METADATA.home;
};

export default async function Page({ params }: PageProps) {
  const { locale } = params;
  const Sliderdata = await getSlidersByLocale(locale);
  const ServicesData = await getServicesByLocale(locale);
  const vision = await getPostByLocale("our vision", locale);
  const mission = await getPostByLocale("our mission", locale);
  const project = await getProjectsByLocale(locale);

  return (
    <div className="w-full">
      <Section image={Image1.src} className="h-screen">
        <SwiperComponent Sliderdata={Sliderdata} />
      </Section>

      <Section image={Image2.src} className="py-24 px-8">
        <OurServices ServicesData={ServicesData} />
      </Section>

      <Section image={Image1.src} className="py-12 px-9 md:px-32 md:py-24">
        <OurVision vision={vision} />
      </Section>

      <Section image={Image2.src} className="py-12 px-9 md:px-32 md:py-24">
        <OurProcess />
      </Section>

      <MissionVision mission={mission} vision={vision} />

      <WhatsNew project={project} />
      <ContactUs />
    </div>
  );
}
