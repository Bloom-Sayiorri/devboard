import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import { userSelect } from "@/types/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

type UserUpdateData = {
	name?: string;
	email?: string;
	password?: string;
	image?: string;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const id = (await params).id;
	const session = await getServerSession(authOptions);
	const userId = session?.user?.id;
	if (!userId) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}
	if (session.user.id !== id) {
		return Response.json({ error: "Forbidden" }, { status: 403 });
	}
	try {
		const user = await prisma.user.findUnique({
			where: { id },
			select: userSelect,
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

		const updateData: UserUpdateData = {};

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

