import Section from "@/components/sections/section1";
import Image2 from "@/public/separator-overlay.png";
import ProjectCard from "@/components/ProjectCard";
import type { categoryWithProject } from "@/types/index";
import { useTranslations } from "next-intl";

interface WhatsNewProps {
  project: categoryWithProject[] | null;
}

export default function WhatsNew({ project }: WhatsNewProps) {
  const t = useTranslations("whatsNewSection");
  const recentProjects = project?.filter((item) => item.project_is_recent) || [];

  return (
    <Section image={Image2.src} className="py-24 px-8 md:px-32">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl font-bold text-[#e1b261]">{t("title")}</h1>
        <h2 className="text-4xl text-center md:text-left mt-2">{t("subtitle")}</h2>

        <div className="mt-12 flex flex-wrap justify-center gap-8 w-full">
          {recentProjects.map((item) => (
            <ProjectCard
              key={item.project_id}
              project={item}
              className="flex-1 min-w-[350px] max-w-[600px]"
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
