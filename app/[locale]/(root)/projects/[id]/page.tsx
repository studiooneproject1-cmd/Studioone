import { getProjectByIdByLocale } from "@/app/models/db/lib/services/projects";
import ProjectHeader from "@/components/projectheader";
import ProjectSection from "@/components/page-sections/project";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { generateDynamicMetadata } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: {
    locale: Locale;
    id: string;
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { locale, id } = params;
  const project = await getProjectByIdByLocale(id, locale);
  if (!project || !project.project_id) return {};

  return generateDynamicMetadata.project({
    id: project.project_id.toString(),
    name: project.project_title ?? "Project",
    description: project.project_description ?? "",
    image: project.project_image ?? "",
  });
}

export default async function page({ params }: PageProps) {
  const { locale, id } = params;
  const t = await getTranslations("header");
  const project = await getProjectByIdByLocale(id, locale);

  if (!project || !project.project_id) notFound();

  return (
    <div>
      <ProjectHeader
        id={project.project_id.toString()}
        link="/projects"
        homeText={t("home")}
      />
      <ProjectSection
        image={project.project_image ?? ""}
        description={project.project_description ?? ""}
        category={project.category_name ?? ""}
      />
    </div>
  );
}
