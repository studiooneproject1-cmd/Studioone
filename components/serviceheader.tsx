import Section from "@/components/sections/section1";
import Image1 from "@/public/hero-overlay.png";
import Link from "next/link";
import ArrowsComponent from "@/components/arrows-component";

import { getTranslations } from "next-intl/server";

interface HeaderProps {
  name: string;

  link: string;
  homeText: string;
}

export default async function ServiceHeader({
  name,
  link,
  homeText,
}: HeaderProps) {
  const t = await getTranslations("header");
  return (
    <div>
      <Section
        image={Image1.src}
        className="flex items-center justify-centermd:p-28 px-8 py-28"
      >
        <div className="text-white text-center flex flex-col items-center max-w-lg">
          <h1 className="text-5xl font-bold mb-4">{name}</h1>

          <section className="bg-[#222224] px-5 py-2 flex items-center">
            <Link href="/">
              <span className="cursor-pointer mr-1">{homeText}</span>
            </Link>
            <span className="flex">
              <ArrowsComponent />
            </span>
            <Link href={link}>
              <span className="text-white cursor-pointer">{t("services")}</span>
            </Link>
            <span className="flex">
              <ArrowsComponent />
            </span>

            <span className="text-[#e1b261] cursor-pointer">{name}</span>
          </section>
        </div>
      </Section>
    </div>
  );
}
