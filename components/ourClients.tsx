"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type { clientsData } from "@/types/index";
import Image from "next/image";

interface OurClientsProps {
  clientsData: clientsData[];
}

export default function Clients({ clientsData }: OurClientsProps) {
  return (
    <section className="w-full">
      <div className="w-full mx-auto">
        <Swiper
          spaceBetween={20}
          loop={clientsData.length > 1} 
          breakpoints={{
            1280: { slidesPerView: 7 },
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {clientsData.map((client, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center">
              <div className="flex justify-center items-center w-24 sm:w-28 md:w-32 h-24 sm:h-28 md:h-32">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={200} 
                  height={200}
                  className="object-contain w-full h-full" 
                  unoptimized={true}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
