"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

type Card = {
  id: number;
  title: string;
  image: string;
};

type Category = {
  name: string;
  cards: Card[];
};

interface CategoriesSectionProps {
  categories: Category[];
}

const CategoriesSection: React.FC<CategoriesSectionProps> = ({ categories }) => {
  const t = useTranslations("CategoriesSection");
  const [activeCategory, setActiveCategory] = useState(0);

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 our-services-header">{t("noProjects")}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4">

      <div className="text-center mb-12">
        <h1 className="text-xl text-[#e1b261] font-bold our-services-header">{t("title")}</h1>
        <h2 className="text-4xl font-semibold mt-2 our-services-header">{t("subtitle")}</h2>
      </div>

     
      <div className="flex flex-wrap gap-3 mb-8 justify-center">
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => setActiveCategory(index)}
            className={`px-5 py-2 rounded-md transition-all duration-300 font-medium ${
              activeCategory === index
                ? "bg-[#333333] text-white shadow-lg"
                : " text-white hover:bg-gray-200 "
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

    
      <div className="flex flex-wrap justify-center gap-6">
        {categories[activeCategory].cards.length === 0 ? (
          <p className="text-center text-gray-500 mb-10 w-full">{t("noCategoryProjects")}</p>
        ) : (
          categories[activeCategory].cards.map((card) => (
            <Link
              key={card.id}
              href={`/projects/${card.id}`}
              className="relative group overflow-hidden rounded-xl cursor-pointer shadow-lg mb-10 w-[300px] transition-all duration-300"
            >
              
              <div className="relative w-full h-48">
                <Image
                  src={card.image}
                  alt={card.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-transform duration-300 group-hover:scale-105 rounded-xl"
                />
              </div>

            
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl z-10"></div>

            
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#e1b261] rounded-xl transition-all duration-300 z-20 pointer-events-none"></div>

       
              <div className="absolute inset-0 flex items-center justify-center z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <span className="text-[#e1b261] text-lg font-semibold">{t("readMore")}</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;
