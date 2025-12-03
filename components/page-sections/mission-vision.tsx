import React from "react";
import Section from "@/components/sections/section1";
import Image1 from "@/public/hero-overlay.png";
import type { postData } from "@/types/index";
import missionp from "@/public/mission.jpg";
import visionp from "@/public/vision.jpg";
import Image from "next/image";

interface visionMissionTextProps {
  vision: postData | null;
  mission: postData | null;
}

export default function MissionVision({ mission, vision }: visionMissionTextProps) {
  return (
    <div>
      <Section
        image={Image1.src}
        className="pt-32 pb-32 flex flex-col justify-between gap-8 px-8"
      >
        <div className="w-full md:w-[80%] mx-auto flex flex-col gap-12">
          {/* Vision Section */}
          <section className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="w-full md:w-[45%] hover:-translate-y-4 transition-all duration-300">
              <Image
                src={visionp}
                alt="Vision"
                className="w-full h-[35vh] object-cover rounded-lg"
              />
            </div>
            <span className="w-full md:w-[50%] flex flex-col justify-between mb-4 md:mb-0">
              <h1 className="text-5xl font-bold text-[#e1b261] mb-6">
                {vision?.name}
              </h1>
              <p className="text-xl leading-7">{vision?.description}</p>
            </span>
          </section>

          {/* Mission Section */}
          <section className="flex flex-col-reverse md:flex-row items-center justify-between gap-12">
            <span className="w-full md:w-[50%] flex flex-col justify-between mb-4 md:mb-0">
              <h1 className="text-5xl font-bold text-[#e1b261] mb-6">
                {mission?.name}
              </h1>
              <p className="text-xl leading-7">{mission?.description}</p>
            </span>
            <div className="w-full md:w-[45%] hover:-translate-y-4 transition-all duration-300">
              <Image
                src={missionp}
                alt="Mission"
                className="w-full h-[35vh] object-cover rounded-lg"
              />
            </div>
          </section>
        </div>
      </Section>
    </div>
  );
}
