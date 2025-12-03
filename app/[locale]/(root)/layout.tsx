import '@fortawesome/fontawesome-svg-core/styles.css';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

config.autoAddCss = false;
library.add(fas);

import Footer from "@/components/footer";
import Header from "@/components/header";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import FontSwitcher from "@/components/fontswitcher/FontSwitcher";
import { routing } from "@/i18n/routing";
import { notFound } from 'next/navigation';

type Props = {
  children: React.ReactNode;
  params:Promise< { locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`)).default;


  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <FontSwitcher locale={locale}>
        <div className="flex flex-col min-h-screen " dir={dir}>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </FontSwitcher>
    </NextIntlClientProvider>
  );
}
