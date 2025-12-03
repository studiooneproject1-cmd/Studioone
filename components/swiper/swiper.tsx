"use client";


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Pagination, Autoplay } from "swiper/modules";
import ArrowButton from "../arrowButton";
import { faFacebookF, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { slidersData } from "@/types/index";
import Image from "next/image";
import Link from "next/link";

export default function SwiperWithSidebar({
  Sliderdata,
}: {
  Sliderdata: slidersData[];
}) {
  return (
    <div className="    w-full px-10 md:px-0 flex flex-col md:flex-row items-center md:items-center  justify-center min-h-screen md:min-h-0 mf">

      <div className="hidden md:flex w-full md:w-1/8 h-[350px] md:h-[450px] lg:h-[550px] flex-col items-center justify-center text-white font-bold text-xl">
        <div className="w-px bg-[#e1b261] h-20 rounded-full mb-6" />

        <FontAwesomeIcon
          icon={faFacebookF}
          className="mb-4 text-md cursor-pointer hover:text-[#e1b261] duration-300 transition-all no-flip"
        />
        <FontAwesomeIcon
          icon={faInstagram}
          className="mb-4 text-md cursor-pointer hover:text-[#e1b261] duration-300 transition-all no-flip"
        />
      </div>

      <div className="w-full md:w-[85vw] h-screen md:h-[450px] lg:h-[550px] relative">
        <Swiper
          pagination={{ clickable: true }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          loop={true}
          modules={[Pagination, Autoplay]}
          className="w-full h-full"
        >
          {Sliderdata.map((slide, index) => (
            <SwiperSlide key={index}>
             
              <div className="flex flex-col md:flex-row-reverse w-full h-full items-center justify-center gap-12 md:justify-start md:gap-0">
                <div className="none md:h-full md:w-13"></div>

     
                <div className="w-full md:w-5/8 h-64 md:h-full order-2 md:order-1 relative">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    title={slide.title}
                    fill
                    style={{ objectFit: "cover", borderRadius: "0.5rem" }}
                  />
                </div>

 <div className="w-full md:w-3/8 h-auto md:h-full flex flex-col justify-center items-center md:items-start pr-3 text-white order-1 md:order-2 mt-4 md:mt-0">
  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[64px] font-bold text-center md:text-left break-words whitespace-normal max-w-full">
    {slide.title}
  </h2>
  <p className="text-base sm:text-lg md:text-lg opacity-80 text-center md:text-left break-words whitespace-normal max-w-full">
    {slide.description}
  </p>
  <Link href={slide.button_link}>
  <ArrowButton>{slide.button_name}</ArrowButton>
  </Link>
</div>


              </div>
            </SwiperSlide>
          ))}
        </Swiper>

  
        <style jsx global>{`
          .swiper-pagination {
            --swiper-pagination-left: 1rem !important;
            --swiper-pagination-right: auto !important;
            
            padding-left: 0 !important;
          }
          .swiper-horizontal > .swiper-pagination-bullets {
            justify-content: flex-start !important;
          }
          .swiper-pagination-bullet {
            background-color: #e1b261 !important;
          }
        `}</style>
      </div>
    </div>
  );
}
