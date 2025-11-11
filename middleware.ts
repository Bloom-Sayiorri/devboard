// export { auth as middleware } from "@/auth"

import { auth } from "@/auth";

// This ensures the middleware runs on Node.js runtime
export const config = {
	matcher: ["/signup", "/login"], // adjust routes
	runtime: "nodejs", // <--- important
};

export default auth;

// export { auth as middleware } from "@/auth";

// export const config = {
// 	matcher: ["/", "/boards/:path*", "/profile/:path*"],
// 	runtime: "nodejs", // 👈 required for Prisma
// };