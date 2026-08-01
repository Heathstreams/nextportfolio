import type { Locale } from "@i18n/config";
import { en, type Dictionary } from "@i18n/dictionaries/en";
import { sv } from "@i18n/dictionaries/sv";

const dictionaries: Record<Locale, Dictionary> = { sv, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
