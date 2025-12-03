import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ProcessCardProps {
  number: string | number;
  title: string;
  text: string;
  icon: IconDefinition;
}

const ProcessCard: React.FC<ProcessCardProps> = ({ number, title, text, icon }) => {
  const formattedNumber = String(number).padStart(2, "0");

  return (
    <div className="
      group bg-[#222224] min-h-[40vh] md:min-h-[65vh] w-full 
      border-b-[3px] border-[#e1b261] rounded-lg 
      p-5 hover:border-white hover:-translate-y-2 
      duration-300 transition-all
    ">
      {/* الرقم والأيقونة */}
      <div className="flex justify-between items-center">
        <span className="text-[96px] text-[#e1b261]">{formattedNumber}</span>
 <FontAwesomeIcon
  icon={icon}
  style={{ width: "70px", height: "70px" }}
  className="transition-all opacity-50 duration-300 group-hover:scale-110 group-hover:opacity-100"
/>


      </div>

      {/* العنوان */}
      <h3 className="md:text-xl text-2xl  font-semibold my-[19px]">{title}</h3>

      {/* النص */}
      <p className="opacity-50 my-[18px]  text-xl md:text-lg">{text}</p>
    </div>
  );
};

export default ProcessCard;
