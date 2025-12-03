// components/Section.tsx
import React, { ReactNode } from "react";

interface SectionProps {
  image: string;          
  children?: ReactNode;   
  className?: string;     
}

export default function Section({ image, children, className }: SectionProps) {
  return (
    <section
      className={`relative w-full ${className}`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor:"black"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#1F1F21] opacity-85"></div>

      {/* Content */}  
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        {children}
      </div>
    </section>
  );
}
