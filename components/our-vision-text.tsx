import React from 'react'
import ArrowButton from './arrowButton'
import Link from "next/link";
import type {postData} from "@/types/index"

interface OurVisionTextProps {
  vision: postData | null;
}


export default function OurVisionText({vision}:OurVisionTextProps) {
  return (
    <section className="w-full md:w-1/3 h-full flex flex-col justify-center text-center md:text-left p-4">

      <h2 className="text-lg font-bold mb-4 text-[#e1b261]">
         {vision?.small_header}
      </h2>

      <h2 className="text-5xl font-bold mb-4">
        {vision?.name}
      </h2>

      <section 
        className="flex flex-col sm:flex-row items-center sm:items-start justify-start gap-4 mb-4 sm:text-left text-center"
      >

        <div className="w-1 bg-[#e1b261] h-32 rounded-full sm:block hidden" />

 
        <p className="opacity-70 flex-1 flex items-center text-lg font-medium sm:text-left text-center">
        {vision?.description}
        </p>
      </section>
<Link href={"/about"}>
      <ArrowButton>{vision?.button_name}</ArrowButton>
      </Link>
    </section>
  )
}
