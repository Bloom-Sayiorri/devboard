import NextAuth from "next-auth";
import { prisma } from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";

export const { handlers, auth } = NextAuth({
	adapter: PrismaAdapter(prisma),
	providers: [
		Google({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_SECRET!,
			profile(profile) {
				return {
					id: profile.sub, // <-- required for PrismaAdapter
					name: profile.name,
					email: profile.email,
					image: profile.picture,
				};
			}
		}),
	],
	session: {
		strategy: "database",
	},
	pages: {
		signIn: '/login',
		// signOut: "/"
	},
	callbacks: {
		async session({ session, user }) {
			if (session?.user) {
				session.user.id = user.id;
			}
			return session;
		}
	},
	secret: process.env.NEXTAUTH_SECRET,
});