import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			include: {
				boards: true,
				tasks: true,
				comments: true,
				notifications: true,
			},
		});

		return NextResponse.json(users, { status: 200 });
	} catch (error) {
		console.error("GET users error:", error);
		return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
	}
}