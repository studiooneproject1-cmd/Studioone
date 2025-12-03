import Header from "@/components/page-sections/header";
import CategoriesSection from "@/components/page-sections/categories-section";
import Section from "@/components/sections/section1";
import ContactUs from "@/components/page-sections/contact-us";
import Image2 from "@/public/separator-overlay.png";
import { getProjectsByLocale, formatCategories } from "@/app/models/db/lib/services/projects";
import { getTranslations } from "next-intl/server";
import { PAGE_METADATA } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = PAGE_METADATA.projects;

export default async function ProjectsPage({ params }: PageProps) {
  const { locale } =await params;
  const t = await getTranslations("header");
  const rawProjects = await getProjectsByLocale(locale);
  const categories = formatCategories(rawProjects, locale);

  return (
    <div>
      <Header
        title={t("projectsTitle")}
        description={t("projectsDescription")}
        link="/projects"
        homeText={t("home")}
      />
      <Section image={Image2.src} className="flex-row justify-between gap-8">
        <CategoriesSection categories={categories} />
      </Section>
      <ContactUs />
    </div>
  );
}
