import React from "react";
import Image from "next/image";
import OurVisionText from "../our-vision-text";
import type { postData } from "@/types/index";
import a from "@/public/a.jpg";
import b from "@/public/b.jpg";


interface OurVisionProps {
  vision: postData | null;
}

export default function OurVision({ vision }: OurVisionProps) {
  return (
    <div className="
      flex flex-col md:flex-row 
      items-center justify-center 
      h-auto md:h-[70vh] 
      gap-8
    ">
      
     
      <section className="w-full md:w-1/3 h-64 md:h-full">
        <Image
          src={a}
          alt="Vision Image 1"
          className="rounded-lg hover:-translate-y-3 duration-300 transition-all object-cover"
          width={500}
          height={400}
          style={{ width: "100%", height: "100%" }}
        />
      </section>

    
      <OurVisionText vision={vision} />

      <section className="w-full md:w-1/3 h-64 md:h-full mb-16 hidden lg:block">
        <Image
          src={b}
          alt="Vision Image 2"
          className="rounded-lg hover:-translate-y-3 duration-300 transition-all object-cover"
          width={500}
          height={400}
          style={{ width: "100%", height: "100%" }}
        />
      </section>

    </div>
  );
}
