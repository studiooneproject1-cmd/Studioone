import React from "react";
import ServicesCard from "@/components/services-card";
import type { servicesData } from "@/types/index";
import { useTranslations } from "next-intl";

interface OurServicesProps {
  ServicesData: servicesData[];
}

export default function OurServices({ ServicesData }: OurServicesProps) {
  const t = useTranslations("ourServices");

  return (
    <div className="flex flex-col items-center text-center gap-9 px-4 md:px-0">
      <div className="w-full md:w-3/5 mx-auto">
        <h1 className="text-xl font-bold text-[#e1b261] our-services-header">
          {t("title")}
        </h1>
        <h1 className="text-3xl md:text-5xl font-semibold our-services-header">
          {t("subtitle")}
        </h1>
      </div>

      <div className="w-full flex flex-wrap justify-center gap-6">
        {ServicesData.map((service, idx) => (
          <ServicesCard
            key={idx}
            name={service.name}
             id={service.id!} 
            description={service.short_description}
            image={service.image}
          />
        ))}
      </div>
    </div>
  );
}
