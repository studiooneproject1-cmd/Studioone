import Header from "@/components/page-sections/header";
import Section from "@/components/sections/section1";
import ContactUs from "@/components/page-sections/contact-us";
import ContactForm from "@/components/contact-form";
import ContactList from "@/components/ContactList";
import Image2 from "@/public/separator-overlay.png";
import Image1 from "@/public/hero-overlay.png";
import { getTranslations } from "next-intl/server";
import { PAGE_METADATA } from "@/lib/constants/metadata";

type Locale = "en" | "ar";

interface PageProps {
  params: { locale: Locale };
}

export const metadata = PAGE_METADATA.contact;

export default async function ContactPage({ params }: PageProps) {
  const { locale } = params;
  const t = await getTranslations("header");

  return (
    <div>
      <Header
        title={t("contactTitle")}
        description={t("contactDescription")}
        link="/contact"
        homeText={t("home")}
      />
      <Section image={Image2.src} className="flex-row justify-between gap-8">
        <ContactList />
      </Section>
      <Section image={Image1.src}>
        <ContactForm />
      </Section>
      <ContactUs />
    </div>
  );
}
