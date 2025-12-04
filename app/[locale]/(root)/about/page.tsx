import React from "react";
import ContactUs from "@/components/page-sections/contact-us";
import Header from "@/components/page-sections/header";
import AboutUs from "@/components/page-sections/about-us";
import OurClients from "@/components/page-sections/our-clients";
import { getClientsByLocale } from "@/app/models/db/lib/services/clients";
import { getPostByLocale } from "@/app/models/db/lib/services/posts";
import { getTranslations } from "next-intl/server";
import { PAGE_METADATA } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = PAGE_METADATA.about;

export default async function page({ params }: PageProps) {
  const { locale } =await params;
  const t = await getTranslations("header");
  const about = await getPostByLocale("about us", locale);
  const clientsData = await getClientsByLocale(locale);

  return (
    <div>
      <Header
        title={t("aboutUsTitle")}
        description={t("aboutUsDescription")}
        link="/about"
        homeText={t("home")}
      />
      <AboutUs about={about} />
 
      <ContactUs />
    </div>
  );
}
