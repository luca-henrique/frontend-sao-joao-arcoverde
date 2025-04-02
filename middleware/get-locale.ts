import { type NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// List of supported locales
export const locales = ["pt", "en", "es"];
export const defaultLocale = "pt";

// Get the preferred locale from the request
function getLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname doesn't have locale, redirect to the preferred locale
  if (!pathnameHasLocale) {
    // Get the preferred locale
    const locale = getLocale(request);

    // Create a new URL with the locale
    const newUrl = new URL(`/${locale}${pathname}`, request.url);

    // Preserve the search params
    newUrl.search = request.nextUrl.search;

    return NextResponse.redirect(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files (e.g. images, fonts, etc.)
  // - _next (Next.js internal routes)
  matcher: ["/((?!api|_next/static|_next/image|images|fonts|favicon.ico).*)"],
};
