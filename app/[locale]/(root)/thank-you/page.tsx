"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export default function ThankYou() {
  const t = useTranslations("thankYou");

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1A1A1C] text-white p-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">
        {t("title")}
      </h1>
      <p className="mb-6 text-center text-lg md:text-xl">{t("message")}</p>

      {/* زر للعودة للفورم */}
      <Link href="/">
        <button className="bg-[#e1b261] text-black font-semibold py-3 px-6 rounded-md hover:bg-yellow-400 transition text-base md:text-lg">
          {t("backButton")}
        </button>
      </Link>
    </div>
  );
}
