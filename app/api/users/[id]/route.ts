import { NextRequest, NextResponse } from "next/server.js";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			include: {
				boards: true,
				tasks: true,
				comments: true,
				notifications: true,
			},
		});

		if (!user) {
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		return NextResponse.json(user, { status: 200 });
	} catch (error) {
		console.error("GET user error:", error);
		return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	try {
		const body = await req.json();
		const { name, email, password, image } = body;

		const updateData: any = {};

		if (name) updateData.name = name;
		if (email) updateData.email = email;
		if (image) updateData.image = image;

		if (password) {
			updateData.password = await bcrypt.hash(password, 10);
		}

		const updatedUser = await prisma.user.update({
			where: { id: id },
			data: updateData,
		});

		return NextResponse.json(updatedUser, { status: 200 });
	} catch (error) {
		console.error("PATCH user error:", error);
		return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	try {
		await prisma.user.delete({
			where: { id: id },
		});

		return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("DELETE user error:", error);
		return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
	}
}