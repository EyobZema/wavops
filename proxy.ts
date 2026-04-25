import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const legacyHost = ["wa", "ve", "ops.io"].join("");

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.toLowerCase() || "";

  if (host === legacyHost || host === `www.${legacyHost}`) {
    const url = request.nextUrl.clone();
    url.protocol = "https";
    url.host = "wavops.io";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

