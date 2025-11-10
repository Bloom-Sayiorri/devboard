import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";

const handler = NextAuth({
	adapter: PrismaAdapter(prisma),
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
	session: {
		strategy: "database", // store sessions in your Neon/Postgres DB
	},
	callbacks: {
		async session({ session, user }) {
			if (session?.user) session.user.id = user.id; // attach DB user id
			return session;
		},
	},
	pages: {
		signIn: "/login",
		signOut: "/signup",
		error: "/login", // redirect on error
	},
	secret: process.env.NEXTAUTH_SECRET,
});



export { handler as GET, handler as POST };