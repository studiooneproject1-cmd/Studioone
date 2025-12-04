import React from "react";
import Section from "@/components/sections/section1";
import Image2 from "@/public/separator-overlay.png";
import type { postData } from "@/types";
import Image from "next/image";

interface visionMissionTextProps {
  vision: postData | null;
  mission: postData | null;
}

export default function MissionVisionR({ mission, vision }: visionMissionTextProps) {
  return (
    <div>
      <Section
        image={Image2.src}
        className="pt-32 pb-32 flex flex-col justify-between gap-8 px-10 md:px-8"
      >
        <div className="w-full md:w-[80%] flex flex-col gap-12 mx-auto">

          {/* Mission Section */}
          <section className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-between gap-8 md:gap-12 mt-12">
            <div className="relative w-full md:w-[45%] h-[30vh] md:h-[45vh] hover:-translate-y-4 transition-all duration-300">
              {mission?.image && (
                <Image
                  src={mission.image}
                  alt={mission.name || "Mission"}
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            <span className="w-full md:w-[50%] flex flex-col justify-between mt-4 md:mt-0">
              <h1 className="text-3xl md:text-5xl font-bold text-[#e1b261] mb-4 md:mb-6">
                {mission?.name}
              </h1>
              <p className="text-lg md:text-xl leading-7">
                {mission?.description}
              </p>
            </span>
          </section>

          {/* Vision Section */}
          <section className="flex flex-col md:flex-row-reverse items-center md:items-center justify-center md:justify-between gap-8 md:gap-12">
              <div className="relative w-full md:w-[45%] h-[30vh] md:h-[45vh] hover:-translate-y-4 transition-all duration-300">
              {vision?.image && (
                <Image
                  src={vision.image}
                  alt={vision.name || "Vision"}
                  fill
                  className="object-cover rounded-lg"
                />
              )}
            </div>
            <span className="w-full md:w-[50%] flex flex-col justify-between mt-4 md:mt-0">
              <h1 className="text-3xl md:text-5xl font-bold text-[#e1b261] mb-4 md:mb-6">
                {vision?.name}
              </h1>
              <p className="text-lg md:text-xl leading-7">
                {vision?.description}
              </p>
            </span>
          
          </section>

        </div>
      </Section>
    </div>
  );
}
