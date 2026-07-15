export { default } from "next-auth/middleware";

export const config = {
	// matcher: ["/boards/:path*", "/dashboard/:path*", "/profile/:path*"],
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico|logo.png|).*)"],
	runtime: "nodejs",
};