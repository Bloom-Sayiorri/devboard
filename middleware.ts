import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server.js";

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
	const url = req.nextUrl.clone();

	// Public routes
	const publicPaths = ["/", "/about", "/signup", "/login"];
	if (publicPaths.includes(url.pathname) || url.pathname.startsWith("/_next") || url.pathname === "/favicon.ico") {
		return NextResponse.next();
	}

	// Redirect to signup if no session
	if (!token) {
		url.pathname = "/signup";
		return NextResponse.redirect(url);
	}

	return NextResponse.next();
}

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|$).*)", "/user/:path*"],
	runtime: "nodejs", // optional, ensures Node runtime

};