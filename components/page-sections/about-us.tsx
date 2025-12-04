import Section from "@/components/sections/section1";
import Image2 from "@/public/separator-overlay.png";

import AboutUsText from "../about-us-text";
import type { postData } from "@/types/index";
import Image from "next/image";

interface AboutProps {
  about: postData | null;
}

export default function AboutUs({ about }: AboutProps) {
  return (
    <div>
      <Section image={Image2.src} className="py-12 px-4 md:py-24 md:px-32">
        <div className="h-full w-full flex flex-col md:flex-row items-center md:items-start justify-center gap-8 md:gap-14 overflow-hidden">

          {/* صورة */}
          <section className="w-full md:w-[40%] h-[40vh] md:h-[60vh] relative min-h-[200px]">
            {about?.image ? (
              <Image
                src={about.image}
                alt={about.name || "About Image"}
                fill
                className="object-cover rounded-lg hover:-translate-y-3 duration-300 transition-all"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 rounded-lg" />
            )}
          </section>

          {/* نص */}
          <section className="w-full md:w-[50%]">
            <AboutUsText about={about} />
          </section>

        </div>
      </Section>
    </div>
  );
}
