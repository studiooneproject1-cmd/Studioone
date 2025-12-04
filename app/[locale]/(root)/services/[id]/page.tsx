import { getServiceByIdByLocale } from "@/app/models/db/lib/services/services";
import ServiceHeader from "@/components/serviceheader";
import ServiceSection from "@/components/page-sections/service";
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
  const { locale, id } = await params;
  const service = await getServiceByIdByLocale(id, locale);

  if (!service || !service.id || !service.name) return {};

  return generateDynamicMetadata.service({
    id: service.id,
    name: service.name,
    description: service.description,
    image: service.image,
  });
}
export default async function ServicePage({ params }: PageProps) {
  const { locale, id } = await params;
  const t = await getTranslations("header");
  const service = await getServiceByIdByLocale(id, locale);

  if (!service) notFound();

  return (
    <div>
      <ServiceHeader
        name={service.name}
        link="/services"
        homeText={t("home")}
      />
      <ServiceSection
        image={service.image}
        description={service.description}
      />
    </div>
  );
}
