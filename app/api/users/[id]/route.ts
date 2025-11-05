import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
	try {
		const user = await prisma.user.find({
			where: { id: params.id },
		});
		return NextResponse.json(user);
	} catch (error) {
        return NextResponse.json({error: "Failed to retireve user"}, {status: 500})
    }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
	try {
		const body = await req.json();
		const user = await prisma.user.find({
			where: { id: params.id },
			data: body,
		});
		return NextResponse.json({ user }, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to update the user" }, { status: 500 });
	}
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
	try {
		await prisma.user.delete({ where: { id: params.id } });
		return NextResponse.json({ message: "User deleted successfully" }, { status: 204 });
	} catch (error) {
        return NextResponse.json({error: "Failed to delete user"}, { status: 500});
    }
}
