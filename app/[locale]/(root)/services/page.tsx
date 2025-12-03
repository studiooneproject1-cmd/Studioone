import Header from "@/components/page-sections/header";
import Section from "@/components/sections/section1";
import ContactUs from "@/components/page-sections/contact-us";
import OurServices from "@/components/page-sections/our-services";
import OurProcess from "@/components/page-sections/our-process";
import Image2 from "@/public/separator-overlay.png";
import { getServicesByLocale } from "@/app/models/db/lib/services/services";
import { getTranslations } from "next-intl/server";
import { PAGE_METADATA } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = PAGE_METADATA.services;

export default async function ServicesPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations("header");
  const ServicesData = await getServicesByLocale(locale);
  /** */
  return (
    <div>
      <Header
        title={t("servicesTitle")}
        description={t("servicesDescription")}
        link="/services"
        homeText={t("home")}
      />
      <Section image={Image2.src} className="h-screen py-24 px-8">
        <OurServices ServicesData={ServicesData} />
      </Section>
      <Section image={Image2.src} className="py-12 px-9 md:px-32 md:py-24">
        <OurProcess />
      </Section>
      <ContactUs />
    </div>
  );
}
