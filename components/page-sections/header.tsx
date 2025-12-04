import Section from "@/components/sections/section1";
import Image1 from "@/public/hero-overlay.png";
import Link from "next/link";
import ArrowsComponent from "@/components/arrows-component";

interface HeaderProps {
  title: string;
  description: string;
  link: string; // link should be a string
  homeText: string; // أضفنا prop للترجمة
}

export default function Header({ title, description, link, homeText }: HeaderProps) {
  return (
    <div>
   <Section
  image={Image1.src}
  className="flex items-center justify-center md:p-28 px-8 py-28 relative z-1"
>

        <div className="text-white text-center flex flex-col items-center max-w-lg">
          <h1 className="text-5xl font-bold mb-4 our-services-header">{title}</h1>

          <p className="text-2xl mb-6 opacity-50 our-services-header">{description}</p>

          <section className="bg-[#222224] px-5 py-2 flex items-center">
            <Link href="/">
              <span className="cursor-pointer mr-1 our-services-header">{homeText}</span>
            </Link>
            <span className="flex">
              <ArrowsComponent />
            </span>
            <Link href={link}>
              <span className="text-[#e1b261] cursor-pointer our-services-header">{title}</span>
            </Link>
          </section>
        </div>
      </Section>
    </div>
  );
}
