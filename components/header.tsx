"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import WhiteLogo from "@/public/WhiteLogo.png";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import LanguageSwitcher from "./language-switcher";
import { useTranslations } from "next-intl";
import ToggleIcon from "@/components/toggleicon";

gsap.registerPlugin(ScrollTrigger);

interface NavLink {
  key: string; // مفتاح الترجمة
  href: string;
}

const navLinks: NavLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "services", href: "/services" },
  { key: "missionvision", href: "/mission-vision" },
  { key: "projects", href: "/projects" },
  { key: "contact", href: "/contact" },
];

const Header: React.FC = () => {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const headerRef = useRef<HTMLHeadingElement>(null);
  const [prevScroll, setPrevScroll] = useState(0);

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll > 10) {
        gsap.to(header, {
          backgroundColor: "#212529",
          backdropFilter: "blur(10px)",
          duration: 0.3,
        });
      } else {
        gsap.to(header, {
          backgroundColor: "rgba(75,85,99,0)",
          backdropFilter: "blur(0px)",
          duration: 0.3,
        });
      }

      if (currentScroll > prevScroll && currentScroll > 100) {
        gsap.to(header, { y: "-100%", duration: 0.5, ease: "power2.out" });
      } else if (currentScroll < prevScroll) {
        gsap.to(header, { y: "0%", duration: 0.5, ease: "power2.out" });
      }

      setPrevScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScroll]);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 w-full z-50 transition-colors"
      style={{ backgroundColor: "rgba(75,85,99,0)" }}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-16 py-5 flex justify-between items-center">
        <Link href="/">
          <Image
            src={WhiteLogo}
            alt="WhiteLogo"
            width={180}
            height={50}
            priority
          />
        </Link>
        <div className=" md:hidden block">
        <ToggleIcon  />
        </div>
        <ul className="md:flex md:items-center md:gap-6 hidden">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <span
                  className={`relative text-[16px] transition-all duration-300 cursor-pointer
                    ${pathname === link.href ? "text-[#e1b261]" : "text-white"}
                  `}
                >
                  {t(link.key)}
                  <span
                    className={`absolute left-0 -bottom-2.5 h-1 rounded-2xl bg-[#e1b261] transition-all duration-300
                      ${pathname === link.href ? "w-full" : "w-0"}
                    `}
                  ></span>
                </span>
              </Link>
            </li>
          ))}

          <LanguageSwitcher />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
