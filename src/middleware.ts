import { NextRequest, NextResponse } from "next/server";
import { IJWTExtended } from "./types/Auth";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";

export async function middleware(request: NextRequest) {
  const token: IJWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });
  console.log({ token, naem: "dwdw" });
  const { pathname } = request.nextUrl;

  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  if (pathname.startsWith("admin")) {
    if (!token) {
    }
  }
}

export const config = {
  matcher: ["/auth/:path*"],
};
