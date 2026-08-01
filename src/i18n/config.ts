export const LOCALES = ["sv", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** Swedish is the default: it lives on "/" while other locales get a path prefix. */
export const DEFAULT_LOCALE: Locale = "sv";

export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lukashedstrom.com";

/** BCP 47 tags used for <html lang> and hreflang. */
export const HTML_LANG: Record<Locale, string> = {
  sv: "sv-SE",
  en: "en",
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** "" for the default locale, "/en" for the rest. */
export function localePrefix(locale: Locale): string {
  return locale === DEFAULT_LOCALE ? "" : `/${locale}`;
}

/** Turns an internal path ("/", "/about") into the public path for a locale. */
export function localeHref(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path;
  return `${localePrefix(locale)}${clean}` || "/";
}

/**
 * Strips a leading locale prefix so components can compare against "/about" etc.
 * Also strips "/sv", which never appears in the browser but is what the internal
 * rewrite target looks like during server rendering.
 */
export function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) return "/";
    if (pathname.startsWith(`/${locale}/`)) return pathname.slice(locale.length + 1);
  }
  return pathname;
}

/**
 * Picks a locale from an Accept-Language header.
 * Swedish wins unless the browser asks for something else without listing Swedish.
 */
export function negotiateLocale(acceptLanguage: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;

  const tags = acceptLanguage
    .split(",")
    .map((part) => part.split(";")[0].trim().toLowerCase())
    .filter(Boolean);

  if (tags.length === 0) return DEFAULT_LOCALE;
  if (tags.some((tag) => tag === "sv" || tag.startsWith("sv-"))) return "sv";

  return "en";
}
