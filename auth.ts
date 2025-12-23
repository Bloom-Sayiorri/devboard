// import NextAuth from "next-auth";
// import { prisma } from "./lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import Google from "next-auth/providers/google";

// export const { handlers, auth } = NextAuth({
// 	adapter: PrismaAdapter(prisma),
// 	providers: [
// 		Google({
// 			clientId: process.env.GOOGLE_CLIENT_ID!,
// 			clientSecret: process.env.GOOGLE_SECRET!,
// 			profile(profile) {
// 				return {
// 					id: profile.sub, // <-- required for PrismaAdapter
// 					name: profile.name,
// 					email: profile.email,
// 					image: profile.picture,
// 				};
// 			}
// 		}),
// 	],
// 	session: {
// 		strategy: "database",
// 	},
// 	pages: {
// 		signIn: '/signup',
// 		// signOut: "/"
// 	},
// 	callbacks: {
// 		async session({ session, user }) {
// 			if (session?.user) {
// 				session.user.id = user.id;
// 			}
// 			return session;
// 		}
// 	},
// 	secret: process.env.NEXTAUTH_SECRET,
// });

import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) return null;

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};