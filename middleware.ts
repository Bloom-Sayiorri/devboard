// export { auth as middleware } from "@/auth"

import { auth } from "@/auth";

// This ensures the middleware runs on Node.js runtime
export const config = {
	matcher: ["/dashboard/:path*"], // adjust routes
	runtime: "nodejs", // <--- important
};

export default auth;