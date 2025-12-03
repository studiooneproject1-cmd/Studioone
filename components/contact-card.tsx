"use client";

import React from "react";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface ContactCardProps {
  number: string | number;
  title: string;
  text: string;
  icon: IconDefinition;
}

const ContactCard: React.FC<ContactCardProps> = ({ title, text, icon }) => {
  return (
    <div className="
      group bg-[#222224] min-h-[35vh] w-full 
      border-b-[3px] border-[#e1b261] rounded-lg 
      p-5
    ">
      <div className="flex justify-between items-center">
        <FontAwesomeIcon
          icon={icon}
          style={{ width: "50px", height: "50px" }}
          className="text-[#e1b261]"
        />
      </div>

      {/* العنوان */}
      <h3 className="text-[19px] font-semibold my-[19px]">{title}</h3>

      {/* النص مع دعم \n */}
      <p className="opacity-50 my-[18px] text-lg whitespace-pre-line">{text}</p>
    </div>
  );
};

export default ContactCard;
