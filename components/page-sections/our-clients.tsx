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
      <Section
        image={Image1.src}
        className="
          h-[40vh] sm:h-[45vh] md:h-[50vh]
          py-10 sm:py-16 md:py-24
          px-4 sm:px-10 md:px-20 lg:px-32
        "
      >
        <div className="flex flex-col items-center text-center">
          
          <h2
            className="
              text-lg sm:text-xl md:text-2xl
              font-bold mb-6 sm:mb-8 md:mb-10
              text-[#e1b261]
            "
          >
            {t("title")}
          </h2>

          <h2
            className="
              text-sm sm:text-lg md:text-xl
              font-bold opacity-50
              mb-6 sm:mb-8 md:mb-10
            "
          >
            {t("subtitle")}
          </h2>

          {/* Clients list is assumed responsive; if not I can fix it too */}
          <Clients clientsData={clientsData} />
        </div>
      </Section>
    </div>
  );
}
