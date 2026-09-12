// export { default } from "next-auth/middleware";

// export const config = {
// 	// matcher: ["/boards/:path*", "/dashboard/:path*", "/profile/:path*"],
// 	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|).*)"],
// 	runtime: "nodejs",
// };
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequestWithAuth } from "next-auth/middleware";

export default withAuth(
	function middleware(req: NextRequestWithAuth) {
		// Since we don't have roles in the Prisma schema yet, 
		// any user who gets past the 'authorized' check below is allowed through.
		return NextResponse.next();
	},
	{
		callbacks: {
			// If a token exists, the user is logged in. 
			// If they aren't logged in, NextAuth automatically kicks them to the login page.
			authorized: ({ token }) => !!token,
		},
		pages: {
			signIn: "/login", 
		}
	}
);

export const config = {
	// Protect these exact folders. Add any other folders you want to keep private here.
	matcher: ["/boards", "/profile"],
};