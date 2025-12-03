import React from "react";
import Image from "next/image"; // استخدام Image من Next.js

interface ServiceProps {
  image: string;        // رابط الصورة
  description: string;  // وصف المشروع
}

export default function Service({ image, description }: ServiceProps) {
  return (
    <div className="bg-[#212529] flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">

      {/* الصورة */}
      <div className="w-full max-w-[75vw] h-[40vh] md:h-[55vh] lg:h-[70vh] relative rounded-md overflow-hidden">
        <Image
          src={image}
          alt="Project Image"
          fill
          className="object-cover rounded-md"
        />
      </div>

      {/* الوصف */}
      <div className="w-full max-w-[75vw] mt-4 p-4 flex flex-col items-center gap-4 rounded-md">
        <p className="text-white text-center leading-9!">
          {description}
        </p>
      </div>

    </div>
  );
}
