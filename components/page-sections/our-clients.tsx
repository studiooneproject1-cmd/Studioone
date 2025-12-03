import Section from "@/components/sections/section1";
import Clients from "@/components/ourClients";
import type { clientsData } from "@/types";

import Image1 from "@/public/hero-overlay.png";
import { useTranslations } from "next-intl";

interface OurClientsProps {
  clientsData: clientsData[];
}

export default function OurClients({ clientsData }: OurClientsProps) {
  const t = useTranslations("ourClients");

  return (
    <div>
      <Section image={Image1.src} className="h-[50vh] py-24 px-32">
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-bold text-center mb-10 text-[#e1b261]">
            {t("title")}
          </h2>

          <h2 className="text-xl font-bold text-center mb-10 opacity-50">
            {t("subtitle")}
          </h2>

          <Clients clientsData={clientsData} />
        </div>
      </Section>
    </div>
  );
}
