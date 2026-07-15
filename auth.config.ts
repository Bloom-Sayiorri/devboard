import Google from "next-auth/providers/google";

export default {
	providers: [
		Google({
			clientId: process.env.NEW_GOOGLE_CLIENT_ID!,
			clientSecret: process.env.NEW_GOOGLE_CLIENT_SECRET!,
		}),
	],
};