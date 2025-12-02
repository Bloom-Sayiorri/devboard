import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
	try {
		const tasks = await prisma.task.findMany({
			orderBy: { createdAt: "desc" },
			include: {
				board: true,
				sprint: true,
				assignedTo: true,
				subtasks: true,
				comments: true,
				labels: true,
			},
		});

		return NextResponse.json(tasks, { status: 200 });
	} catch (error) {
		console.error("GET tasks error:", error);
		return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
	}
}

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();

		const { title, description, priority, status, dueDate, boardId, sprintId, assignedToId, parentTaskId } = body;

		if (!title || !boardId) {
			return NextResponse.json({ error: "Title and boardId are required" }, { status: 400 });
		}

		const newTask = await prisma.task.create({
			data: {
				title,
				description,
				priority,
				status,
				dueDate: dueDate ? new Date(dueDate) : null,
				boardId,
				sprintId,
				assignedToId,
				parentTaskId,
			},
		});

		return NextResponse.json(newTask, { status: 201 });
	} catch (error) {
		console.error("POST task error:", error);
		return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
	}
}