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
          spaceBetween={15}
          loop={clientsData.length > 1}
          centeredSlides={true}
          breakpoints={{
            1280: { slidesPerView: 7 },
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            480: { slidesPerView: 3 }, // شاشة صغيرة
            0: { slidesPerView: 3 },   // أصغر شاشة
          }}
        >
          {clientsData.map((client, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center">
              <div className="flex justify-center items-center w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 justify-self-center ">
                <Image
                  src={client.image}
                  alt={client.name}
                  width={150}
                  height={150}
                  className="object-contain w-full h-full "
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
