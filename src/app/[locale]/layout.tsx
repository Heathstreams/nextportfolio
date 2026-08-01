import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@components/Navbar";
import Footer from "@components/Footer";
import Providers from "@components/Providers";
import {
  DEFAULT_LOCALE,
  HTML_LANG,
  LOCALES,
  SITE_URL,
  isLocale,
  localeHref,
} from "@i18n/config";
import { getDictionary } from "@i18n/getDictionary";
import "../globals.css";

type LayoutParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutParams): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  const t = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: localeHref("/", locale),
      languages: {
        sv: localeHref("/", "sv"),
        en: localeHref("/", "en"),
        "x-default": localeHref("/", DEFAULT_LOCALE),
      },
    },
    openGraph: {
      title: t.meta.title,
      description: t.meta.description,
      url: localeHref("/", locale),
      siteName: "Lukas Hedström",
      locale: HTML_LANG[locale].replace("-", "_"),
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: { children: React.ReactNode } & LayoutParams) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const dictionary = getDictionary(locale);

  return (
    <html lang={HTML_LANG[locale]} suppressHydrationWarning>
      <body className="antialiased bg-background text-foreground">
        <Providers locale={locale} dictionary={dictionary}>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
