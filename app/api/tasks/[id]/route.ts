import { NextRequest, NextResponse } from "next/server.js";
import prisma from "@/lib/prisma";

export async function GET(req: NextRequest, {params}: { params: Promise<{ id: string }> }) {
	const { id: idString } = await params;
	const id = Number(idString);

	try {
		const task = await prisma.task.findUnique({
			where: { id },
			include: {
				board: true,
				sprint: true,
				assignedTo: true,
				subtasks: true,
				comments: true,
				labels: true,
			},
		});

		if (!task) {
			return NextResponse.json({ error: "Task not found" }, { status: 404 });
		}

		return NextResponse.json(task, { status: 200 });
	} catch (error) {
		console.error("GET task error:", error);
		return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
	}
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id: idString } = await params;
	const id = Number(idString);

	try {
		const body = await req.json();

		const task = await prisma.task.update({
			where: { id },
			data: body,
			include: {
				board: true,
				sprint: true,
				assignedTo: true,
				subtasks: true,
				comments: true,
				labels: true,
			},
		});

		return NextResponse.json(task, { status: 200 });
	} catch (error) {
		console.error("PATCH task error:", error);
		return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
	}
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
	const { id: idString } = await params;
	const id = Number(idString);

	try {
		await prisma.task.delete({
			where: { id },
		});

		return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
	} catch (error) {
		console.error("DELETE task error:", error);
		return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
	}
}

// export async function GET(
// 	req: NextRequest,
// 	context: { params: Promise<{ id: string }> } // ✅ matches Next.js type
// ) {
// 	const { id } = await context.params; // await the promise
// 	const taskId = Number(id); // ✅ convert string to number

// 	try {
// 		const task = await prisma.task.findUnique({
// 			where: { id: taskId },
// 			include: {
// 				board: true,
// 				sprint: true,
// 				assignedTo: true,
// 				subtasks: true,
// 				comments: true,
// 				labels: true,
// 			},
// 		});

// 		if (!task) {
// 			return NextResponse.json({ error: "Task not found" }, { status: 404 });
// 		}

// 		return NextResponse.json(task, { status: 200 });
// 	} catch (error) {
// 		console.error("GET task error:", error);
// 		return NextResponse.json({ error: "Failed to fetch task" }, { status: 500 });
// 	}
// }

// export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
// 	try {
// 		const body = await req.json();

// 		const updatedTask = await prisma.task.update({
// 			where: { id: Number(params.id) },
// 			data: {
// 				...body,
// 				dueDate: body.dueDate ? new Date(body.dueDate) : undefined,
// 			},
// 		});

// 		return NextResponse.json(updatedTask, { status: 200 });
// 	} catch (error) {
// 		console.error("PATCH task error:", error);
// 		return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
// 	}
// }

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
// 	try {
// 		await prisma.task.delete({
// 			where: { id: Number(params.id) },
// 		});

// 		return NextResponse.json({ message: "Task deleted successfully" }, { status: 200 });
// 	} catch (error) {
// 		console.error("DELETE task error:", error);
// 		return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
// 	}




// }