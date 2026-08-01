import { notFound } from "next/navigation";

/**
 * Catches unknown paths inside a locale so they render the localized
 * not-found page (with navbar, footer and the right language) instead of
 * Next's bare global 404.
 */
export default function CatchAllPage(): never {
  notFound();
}
