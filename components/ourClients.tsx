"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import type {clientsData}from "@/types/index"
import Image from "next/image";



interface OurClientsProps {
  clientsData: clientsData[];
}










export default function Clients({clientsData}: OurClientsProps) {
   
console.log(clientsData)

  return (
    <section >


      <div className="max-w-5xl mx-auto">
        <Swiper
          spaceBetween={20}
          slidesPerView={7}
          loop={true}
          breakpoints={{
            1280: { slidesPerView: 7 },
            1024: { slidesPerView: 6 },
            768: { slidesPerView: 4 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {clientsData.map((client, idx) => (
            
            <SwiperSlide key={idx}>
              <div className="h-28 flex items-center justify-center   rounded-xl text-lg font-medium shadow">
                <Image src={client.image} alt={client.name} width={90} height={90}></Image>
                
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
