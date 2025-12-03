import Header from "@/components/page-sections/header";
import MissionVisionR from "@/components/page-sections/mission-vision-r";
import ContactUs from "@/components/page-sections/contact-us";
import { getPostByLocale } from "@/app/models/db/lib/services/posts";
import { getTranslations } from "next-intl/server";
import { PAGE_METADATA } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = PAGE_METADATA.mission;

export default async function MissionVisionPage({ params }: PageProps) {
  const { locale } =await params;
  const t = await getTranslations("header");
  const vision = await getPostByLocale("our vision", locale);
  const mission = await getPostByLocale("our mission", locale);

  return (
    <div>
      <Header
        title={t("missionVisionTitle")}
        description={t("missionVisionDescription")}
        link="/mission-vision"
        homeText={t("home")}
      />
      <MissionVisionR vision={vision} mission={mission} />
      <ContactUs />
    </div>
  );
}
