"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  localeHref,
  stripLocale,
  type Locale,
} from "@i18n/config";
import { useI18n } from "@i18n/I18nProvider";

/**
 * Sits directly above the theme toggle in the bottom-left utility stack and
 * shares its mix-blend-difference treatment, so the two read as one control pair.
 */
export default function LanguageToggle() {
  const { locale, t } = useI18n();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const nextLocale: Locale = locale === "sv" ? "en" : "sv";
  const target = localeHref(stripLocale(pathname ?? "/"), nextLocale);

  const switchLanguage = () => {
    // Written before navigating so the proxy sees the choice on this request.
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${LOCALE_COOKIE_MAX_AGE}; samesite=lax`;
    startTransition(() => {
      router.push(target);
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={switchLanguage}
      disabled={isPending}
      aria-label={t.common.switchLanguage}
      title={t.common.switchLanguage}
      lang={nextLocale}
      className="fixed left-5 bottom-[4.75rem] sm:bottom-[4.25rem] z-50 mix-blend-difference
        w-10 h-10 flex items-center justify-center rounded-full
        text-white text-[0.9375rem] font-semibold tracking-wider leading-none
        transition-transform duration-300 hover:scale-110 active:scale-95
        disabled:opacity-60 [-webkit-tap-highlight-color:transparent]"
    >
      {t.common.otherLocaleLabel}
    </button>
  );
}
