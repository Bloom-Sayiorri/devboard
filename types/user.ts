import { Prisma } from "@prisma/client";

export const userSelect = {
	id: true,
	name: true,
	email: true,
	image: true,
	emailVerified: true,
	createdAt: true,

	boards: {
		select: {
			id: true,
			role: true,
			board: {
				select: {
					id: true,
					name: true,
					description: true,
					image: true,
					visibility: true,
				},
			},
		},
	},

	tasks: {
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			title: true,
			status: true,
			priority: true,
		},
	},

	comments: {
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			content: true,
			createdAt: true,
		},
	},

	notifications: {
		take: 10,
		orderBy: {
			createdAt: "desc",
		},
		select: {
			id: true,
			message: true,
			read: true,
			createdAt: true,
		},
	},
} satisfies Prisma.UserSelect;

export type UserWithDetails = Prisma.UserGetPayload<{
	select: typeof userSelect;




}>;