// import { PrismaAdapter } from "@auth/prisma-adapter";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import prisma from "@/lib/prisma";
// import { compare } from "bcrypt";
// import type { NextAuthOptions } from "next-auth";

// export const authOptions: NextAuthOptions = {
// 	adapter: PrismaAdapter(prisma),
// 	session: { strategy: "jwt" },
// 	providers: [
// 		GoogleProvider({
// 			clientId: process.env.NEW_GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.NEW_GOOGLE_CLIENT_SECRET!,
// 		}),
// 		CredentialsProvider({
// 			name: "Credentials",
// 			credentials: {
// 				email: { label: "Email", type: "text" },
// 				password: { label: "Password", type: "password" },
// 			},
// 			async authorize(credentials) {
// 				try {
// 					const user = await prisma.user.findUnique({
// 						where: {
// 							email: credentials?.email,
// 						},
// 					});

// 					if (!user) {
// 						return null;
// 					}

// 					if (!user.password) {
// 						return null;
// 					}

// 					const valid = await compare(credentials!.password, user.password);

// 					if (!valid) return null;

// 					return {
// 						id: user.id,
// 						name: user.name,
// 						email: user.email,
// 						image: user.image,
// 					};
// 				} catch (err) {
// 					throw err;
// 				}
// 			},
// 		}),
// 	],
// 	pages: {
// 		signIn: "/login",
// 	},
// 	callbacks: {
// 		async jwt({ token, user }) {
// 			if (user) {
// 				token.id = user.id;
// 			}
// 			return token;
// 		},
// 		async session({ session, token }) {
// 			if (session.user) {
// 				session.user.id = token.id as string;
// 			}
// 			return session;
// 		},
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// };

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import { compare } from "bcrypt";

export const { handlers, auth, signIn, signOut } = NextAuth({
	adapter: PrismaAdapter(prisma),

	session: {
		strategy: "jwt",
	},

	providers: [
		Google({
			clientId: process.env.NEW_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.NEW_GOOGLE_CLIENT_SECRET!,
		}),

		Credentials({
			credentials: {
				email: {},
				password: {},
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) return null;

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email as string,
					},
				});

				if (!user?.password) return null;

				const valid = await compare(credentials.password as string, user.password);

				if (!valid) return null;

				return {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
				};
			},
		}),
	],

	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},

		session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
			}

			return session;
		},
	},

	pages: {
		signIn: "/login",
	},

	secret: process.env.AUTH_SECRET,

});