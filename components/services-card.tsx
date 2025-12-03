import { faTools } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ReadMore from "./read-more-button";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";

interface ServicesCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  className?: string;
}

export default function ServicesCard({
  id,
  name,
  description,
  image,
  className = "",
}: ServicesCardProps) {
  const t = useTranslations('ServicesCard');

  return (
    <div
      className={`bg-[#222224] rounded-lg overflow-hidden shadow-lg group transition-all duration-300 hover:-translate-y-3 mx-auto 
      w-full sm:w-[48%] max-w-[550px] ${className}`}
    >
      {/* حاوية الصورة */}
      <div className="relative h-[130px] sm:h-[180px] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* الأيقونة */}
      <div className="flex justify-start mx-8 -mt-10 mb-2 relative z-10">
        <div
          className="flex items-center justify-center 
          text-white text-xl sm:text-2xl bg-[#e1b261] rounded-full 
          transition-all duration-300 group-hover:-translate-y-3
          w-14 h-14 sm:w-20 sm:h-20"
        >
          <FontAwesomeIcon icon={faTools} />
        </div>
      </div>

      {/* محتوى الكارد */}
      <div className="p-4 sm:p-5 flex flex-col gap-4 sm:gap-6">
        <h1 className="text-white text-lg sm:text-xl font-bold">{name}</h1>

        <p className="text-gray-300 text-sm sm:text-md leading-relaxed break-words">
          {description}
        </p>

        <Link href={`/services/${id}`}>
          <ReadMore>{t('readMore')}</ReadMore>
        </Link>
      </div>
    </div>
  );
}
