"use client";

import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@i18n/I18nProvider";
import type { Locale } from "@i18n/config";
import type { Dictionary } from "@i18n/dictionaries/en";

export default function Providers({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <I18nProvider locale={locale} dictionary={dictionary}>
      <ThemeProvider
        attribute="data-theme"
        defaultTheme="light"
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </I18nProvider>
  );
}
