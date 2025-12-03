"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const toggleLocale = () => {
    const newLocale = locale === "en" ? "ar" : "en";


    const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

 
    router.push(`/${newLocale}${pathWithoutLocale}`);
  };

  return (
   <button onClick={toggleLocale} className="border rounded-lg px-2 py-0.5 text-[#e1b261] border-[#e1b261]">
          
         
      {locale === "en" ? "العربية" : "English"}
    </button>
  );
}
