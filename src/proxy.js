import { NextResponse } from "next/server";

const protectedRoutes = [
  "/profile",
  "/profile/tours",
  "/profile/transactions",
  "/booking",
];

export function proxy(request) {
  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (!accessToken) {
      const url = request.nextUrl.clone();
      url.pathname = "/";
      url.searchParams.set("redirect", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile/:path*", "/booking/:path*"],
};
