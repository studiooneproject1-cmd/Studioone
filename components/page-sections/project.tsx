import React from "react";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

interface ProjectProps {
  image: string;
  description: string | null;
  category: string;
}
export default async function Project({ image, description, category }: ProjectProps) {
  // الحصول على الترجمات
  const t = await getTranslations("header"); // "Project" هو namespace الخاص بالترجمات

  return (
    <div className="w-full bg-[#212529] p-6 md:p-12 lg:p-24">

      {/* Grid Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

        {/* العمود الرئيسي */}
        <div className="lg:col-span-3 flex flex-col items-center">
          <div className="w-full h-[40vh] md:h-[55vh] lg:h-[70vh] relative">
            <Image
              src={image}
              alt="Project Image"
              fill
              className="object-cover rounded-md"
            />
          </div>

          <div className="mt-4 p-4 flex flex-col items-center gap-4 rounded-md w-full">
            <p className="text-white text-center leading-9!">
              {description}
            </p>
          </div>
        </div>

        {/* صندوق الفئات */}
        <aside className="lg:col-span-1 flex justify-center h-fit">
          <div className="w-full border border-white p-4 rounded-md flex flex-col items-center text-white gap-3">
            
            {/* استخدام الترجمة */}
            <h1 className="text-xl font-bold text-[#e1b261]">
              {t("categories")}
            </h1>

            <hr className="w-4/5 border-[#e1b261]" />

            <p className="text-center leading-relaxed">{category}</p>
          </div>
        </aside>

      </div>
    </div>
  );
}
