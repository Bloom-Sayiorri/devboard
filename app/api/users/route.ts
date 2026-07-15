import prisma from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server.js";
import bcrypt from "bcrypt";

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

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const { name, email, password, image } = body;

		if (!email) {
			return NextResponse.json({ error: "Email is required" }, { status: 400 });
		}

		const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

		const newUser = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				image,
			},
		});

		return NextResponse.json(newUser, { status: 201 });
	} catch (error) {
		console.error("POST user error:", error);
		return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
	}
}