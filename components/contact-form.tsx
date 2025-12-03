"use client";
import React from "react";
import Image from "next/image";
import Picture1 from "@/public/Picture1.png";
import { useTranslations } from "next-intl";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  return (
    <div className="bg-[#1A1A1C] flex flex-col md:flex-row items-center gap-10 p-6 md:p-12 w-[80%] mx-auto my-20  ">
      <div className="w-full md:w-1/3 h-64 md:h-96 relative">
        <Image
          src={Picture1}
          alt={t("imageAlt") || "Contact"}
          className="rounded-lg object-cover"
          fill
        />
      </div>

      <div className="w-full md:w-2/3 p-6 rounded-lg flex flex-col">
        <h2 className="text-2xl text-white mb-6 text-center md:text-left">
          {t("title")}
        </h2>
        <form className="flex flex-col gap-4 w-full">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder={t("firstName")}
              className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1b261]"
            />
            <input
              type="text"
              placeholder={t("lastName")}
              className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1b261]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="number"
              placeholder={t("phone")}
              className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1b261]"
            />
            <input
              type="email"
              placeholder={t("email")}
              className="flex-1 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1b261]"
            />
          </div>

          <textarea
            placeholder={t("message")}
            className="p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-[#e1b261] resize-none w-full"
            rows={5}
          />

          <button
            type="submit"
            className="bg-[#e1b261] text-black font-semibold py-3 rounded-md mt-4 hover:bg-yellow-400 transition"
          >
            {t("send")}
          </button>
        </form>
      </div>
    </div>
  );
}
