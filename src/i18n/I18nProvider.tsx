"use client";

import { createContext, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import { localeHref, stripLocale, type Locale } from "@i18n/config";
import type { Dictionary } from "@i18n/dictionaries/en";

type I18nValue = {
  locale: Locale;
  /** The active dictionary — access it directly, e.g. `t.hero.title`. */
  t: Dictionary;
  /** Prefixes an internal path with the active locale. */
  href: (path: string) => string;
};

const I18nContext = createContext<I18nValue | null>(null);

export function I18nProvider({
  locale,
  dictionary,
  children,
}: {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo<I18nValue>(
    () => ({
      locale,
      t: dictionary,
      href: (path: string) => localeHref(path, locale),
    }),
    [locale, dictionary]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nValue {
  const value = useContext(I18nContext);
  if (!value) {
    throw new Error("useI18n must be used inside an I18nProvider");
  }
  return value;
}

/**
 * The current pathname with any locale prefix removed, so route checks stay
 * locale-agnostic ("/about" whether the visitor is on /about or /en/about).
 */
export function useLocalePathname(): string {
  const pathname = usePathname();
  return stripLocale(pathname ?? "/");
}
