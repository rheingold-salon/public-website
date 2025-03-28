import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";

let locales = ["en", "de"];

function getLocale(request) {
  let headers = { "accept-language": request.headers.get("accept-language") };
  let languages = new Negotiator({ headers }).languages();
  let defaultLocale = "de";

  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  // Redirect if there is no locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /de/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    "/",
    "/marktforschung-services",
    "/salon-rheingold",
    "/gruender-team",
    "/dates-events",
    "/dates-events/podcasts",
    "/dates-events/tv",
    "/dates-events/vortraege",
    "/news-publikationen",
    "/referenzen-cases",
    "/impressum",
    "/datenschutz",
  ],
};
