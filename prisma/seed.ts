import { Prisma, PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
	{
		name: "Alice",
		age: 30,
		email: "alice@prisma.com",
		posts: {
			create: [
				{
					title: "Prisma on YouTube",
					content: "https://pris.ly/youtube",
					published: true,
				},
			],
		},
	},
	{
		name: "Bo",
		age: 25,
		email: "bob@prisma.com",
		posts: {
			create: [
				{
					title: "Follow Prisma on Twitter",
					content: "https://www.twitter.com/prisma",
					published: true,
				},
			],
		},
	},
];

export async function main() {
	for (const post of userData) {
		await prisma.user.create({ data: post });
	}
}

// main();
