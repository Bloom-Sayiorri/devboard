import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server"

export async function GET() {
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({tasks}, {status: 200});
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { title, description } = body;
        const newTask = await prisma.task.create({
            data: { title, description },
        });
        return NextResponse.json(newTask, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create task."}, { status: 500})
    }
}