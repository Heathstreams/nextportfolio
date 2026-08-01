import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  LOCALE_COOKIE_MAX_AGE,
  resolveLocale,
} from "@i18n/config";

/**
 * Locale routing:
 *   - Swedish (default) is served from "/" and "/about" via an internal rewrite
 *     to the "/sv" segment, so existing URLs keep working.
 *   - English lives on "/en/...".
 *   - "/sv/..." redirects to the unprefixed canonical URL.
 *   - Every first-time visitor gets Swedish regardless of browser language;
 *     only the language toggle (which sets NEXT_LOCALE) switches them to English.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  // Keep one canonical URL for Swedish: /sv/foo -> /foo
  if (pathname === "/sv" || pathname.startsWith("/sv/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice("/sv".length) || "/";
    const response = NextResponse.redirect(url);
    response.cookies.set(LOCALE_COOKIE, "sv", {
      path: "/",
      maxAge: LOCALE_COOKIE_MAX_AGE,
      sameSite: "lax",
    });
    return response;
  }

  const locale = resolveLocale(request.cookies.get(LOCALE_COOKIE)?.value);

  const url = request.nextUrl.clone();

  if (locale !== DEFAULT_LOCALE) {
    url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
    return NextResponse.redirect(url);
  }

  url.pathname = `/${DEFAULT_LOCALE}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Everything except Next internals, API routes and files with an extension.
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
