import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const users = await prisma.user.findMany({
			orderBy: { createdAt: "desc" },
		});
		return NextResponse.json({ users }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to retrieve users" }, { status: 500 });
	}
}

export async function POST(req: Request) {
	try {
        const body = req.json();
        const user = await prisma.user.create({data: body})
		return NextResponse.json({user}, { status: 201 });
	} catch (error) {
		return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
	}
}