import React from 'react'
import ArrowButton from './arrowButton'
import Link from "next/link";
import type { postData } from "@/types/index"

interface OurVisionTextProps {
  vision: postData | null;
}

export default function OurVisionText({ vision }: OurVisionTextProps) {
  return (
    <section className="w-full md:w-1/3 h-full flex flex-col justify-center text-left p-4">

      <h2 className="text-lg font-bold mb-4 text-[#e1b261]">
        {vision?.small_header}
      </h2>

      <h2 className="text-5xl font-bold mb-4">
        {vision?.name}
      </h2>

      <section 
        className="flex flex-row items-start justify-start gap-4 mb-4 text-left"
      >

        {/* الخط العمودي */}
        <div className="w-1 bg-[#e1b261] self-stretch min-h-full py-2 rounded-full" />

        {/* النص */}
        <p className="opacity-70 flex-1 text-lg font-medium flex items-center">
          {vision?.description}
        </p>
      </section>

      <Link href={"/about"}>
        <ArrowButton>{vision?.button_name}</ArrowButton>
      </Link>

    </section>
  );
}
