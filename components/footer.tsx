import Image from "next/image";
import Link from "next/link";
import separatorOverlay from "@/public/separator-overlay.png";
import WhiteLogo from "@/public/WhiteLogo.png";
import ArrowButton from "@/components/arrowButton";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronRight, 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope 
} from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';

import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations("footer");

  const quickLinks = [
    { name: t("links.home"), href: "/" },
    { name: t("links.about"), href: "/about" },
    { name: t("links.projects"), href: "/projects" },
    { name: t("links.contact"), href: "/contact" },
    { name: t("links.services"), href: "/services" },
    { name: t("links.missionVision"), href: "/mission-vision" },
  ];

  const contactInfo = [
    { icon: faEnvelope, text: t("email"), href: "mailto:info@example.com" },
    { icon: faPhone, text: t("phone1"), href: "tel:+1234567890" },
    { icon: faPhone, text: t("phone2"), href: "tel:+0987654321" },
    { icon: faMapMarkerAlt, text: t("address"), href: "#" }
  ];

  return (
    <footer className="relative text-white">
      <div className="relative h-auto min-h-[58vh] bg-[#1F1F21]">
        <div className="absolute inset-0">
          <Image
            src={separatorOverlay}
            alt="separator overlay"
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            className="z-0"
          />
          <div className="absolute inset-0 bg-[#18181A] opacity-85 z-10 h-full"></div>
        </div>

        <div className="relative z-20 mx-auto px-4 py-16 flex flex-col gap-12 md:flex-row md:items-start md:justify-center md:mx-36">


          <div className="flex flex-col flex-1 space-y-4 items-center md:items-start text-center md:text-left">
            <Image src={WhiteLogo} alt="WhiteLogo" className="z-0" />
            <p className="text-[20px] font-semibold">{t("ctaText")}</p>
             <Link href="/contact">
            <ArrowButton>
             {t("contactUs")}
            </ArrowButton></Link>
          </div>

          <div className="flex flex-col flex-1 space-y-2 items-center md:items-start text-center md:text-left">
            <h3 className="text-[24px] text-[#e1b261] font-semibold">{t("quickLinks")}</h3>
            {quickLinks.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="flex items-center gap-2 text-[18px] transition-transform duration-300 hover:translate-x-2 m-0.5"
              >
                <FontAwesomeIcon icon={faChevronRight} className="text-[#e1b261] w-2" />
                {link.name}
              </Link>
            ))}
          </div>

  
          <div className="flex flex-col flex-1 space-y-2 items-center md:items-start text-center md:text-left">
            <h3 className="text-[24px] text-[#e1b261] font-semibold">{t("contactInfo")}</h3>

            {contactInfo.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="flex items-center gap-3.5 text-[18px] m-0.5 transition-transform duration-300 hover:translate-x-2"
              >
                <FontAwesomeIcon icon={item.icon} className="text-[#e1b261] w-4 h-4" />
                <span>{item.text}</span>
              </Link>
            ))}

            {/* Social icons */}
            <div className="flex gap-4 mt-4">
              <Link href="#" className="text-white hover:text-[#e1b261] transition-all hover:scale-110 duration-500">
                <FontAwesomeIcon icon={faFacebookF} className="w-6 h-6 no-flip" />
              </Link>
              <Link href="#" className="text-white hover:text-[#e1b261] transition-all hover:scale-110 duration-500">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6 no-flip" />
              </Link>
            </div>
          </div>
        </div>
      </div>


      <div className="relative bg-black text-center text-[14px] py-1">
        <div className="absolute inset-0 bg-[#18181A] opacity-85 z-0"></div>
        <div className="relative z-10 our-services-header">
          © {new Date().getFullYear()} Nuremberg Group | {t("rights")}
        </div>
      </div>
    </footer>
  );
}
