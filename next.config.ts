import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["lh3.googleusercontent.com"],
	},
	serverExternalPackages: [
		"@prisma/client",
		"@prisma/adapter-pg",
		"pg"
	],
	// defaultRuntime: "nodejs",
};

export default nextConfig;