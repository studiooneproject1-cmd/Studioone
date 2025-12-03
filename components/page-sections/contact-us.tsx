import React from 'react';
import Section from "@/components/sections/section1";
import Image3 from "@/public/background1.jpg";
import ArrowButton from '../arrowButton';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function ContactUs() {
  const t = useTranslations("contacts");

  return (
    <div>
      <Section image={Image3.src} className="h-screen">
        <div
          className="
            flex flex-col items-center text-center
            w-[90%] sm:w-[80%] md:w-[70%]
          "
        >
          <h1
            className="
              text-[#e1b261]
              text-xl sm:text-2xl
              our-services-header
            "
          >
            {t("sectionTitle")}
          </h1>

          <h2
            className="
              text-white
              text-[2.5rem] sm:text-[4rem] md:text-[5rem]
              leading-12 sm:leading-18 md:leading-22
              our-services-header
            "
          >
            {t("sectionSubtitle")}
          </h2>

          <Link href={"/contact"}>
            <ArrowButton>
              {t("buttonText")}
            </ArrowButton>
          </Link>
        </div>
      </Section>
    </div>
  );
}
