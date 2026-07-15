import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import prisma from "@/lib/prisma";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),

	session: {
		strategy: "jwt",
	},

	providers: [
		GoogleProvider({
			clientId: process.env.AUTH_GOOGLE_ID!,
			clientSecret: process.env.AUTH_GOOGLE_SECRET!,
		}),

		CredentialsProvider({
			name: "Credentials",

			credentials: {
				email: {
					label: "Email",
					type: "email",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},

			async authorize(credentials) {
				if (!credentials?.email || !credentials.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user || !user.password) {
					return null;
				}

				const valid = await compare(credentials.password, user.password);

				if (!valid) {
					return null;
				}

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
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id;
			}

			return token;
		},

		async session({ session, token }) {
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
};

// import NextAuth from "next-auth";
// import Google from "next-auth/providers/google";
// import Credentials from "next-auth/providers/credentials";
// import { PrismaAdapter } from "next-auth/prisma-adapter";
// import prisma from "@/lib/prisma";
// import { compare } from "bcrypt";

// export const { handlers, auth, signIn, signOut } = NextAuth({
// 	adapter: PrismaAdapter(prisma),

// 	session: {
// 		strategy: "jwt",
// 	},

// 	providers: [
// 		Google({
// 			clientId: process.env.AUTH_GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.AUTH_GOOGLE_CLIENT_SECRET!,
// 		}),

// 		Credentials({
// 			credentials: {
// 				email: {},
// 				password: {},
// 			},

// 			async authorize(credentials) {
// 				if (!credentials?.email || !credentials.password) return null;

// 				const user = await prisma.user.findUnique({
// 					where: {
// 						email: credentials.email as string,
// 					},
// 				});

// 				if (!user?.password) return null;

// 				const valid = await compare(credentials.password as string, user.password);

// 				if (!valid) return null;

// 				return {
// 					id: user.id,
// 					name: user.name,
// 					email: user.email,
// 					image: user.image,
// 				};
// 			},
// 		}),
// 	],

// 	callbacks: {
// 		jwt({ token, user }) {
// 			if (user) {
// 				token.id = user.id;
// 			}

// 			return token;
// 		},

// 		session({ session, token }) {
// 			if (session.user) {
// 				session.user.id = token.id as string;
// 			}

// 			return session;
// 		},
// 	},

// 	pages: {
// 		signIn: "/login",
// 	},

// 	secret: process.env.AUTH_SECRET,

// });

// import NextAuth from "next-auth";
// import authConfig from "./auth.config";

// import { PrismaAdapter } from "@auth/prisma-adapter";
// import prisma from "@/lib/prisma";

// import Credentials from "next-auth/providers/credentials";
// import { compare } from "bcrypt";

// export const { handlers, auth, signIn, signOut } = NextAuth({
// 	adapter: PrismaAdapter(prisma),
// 	session: { strategy: "jwt" },

// 	...authConfig,

// 	providers: [
// 		...authConfig.providers,

// 		Credentials({
// 			credentials: {
// 				email: {},
// 				password: {},
// 			},

// 			async authorize(credentials) {
// 				const user = await prisma.user.findUnique({
// 					where: { email: credentials?.email },
// 				});

// 				if (!user || !user.password) return null;

// 				const valid = await compare(credentials!.password, user.password);

// 				if (!valid) return null;

// 				return {
// 					id: user.id,
// 					email: user.email,
// 					name: user.name,
// 					image: user.image,
// 				};
// 			},
// 		}),
// 	],

// });
