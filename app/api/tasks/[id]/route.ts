import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}: {params: {id: string}}) {
    try {
        const user = await prisma.task.find({
            where: {id: params.id}
        })
        return NextResponse.json({user}, {status: 200})
    } catch (error) {
        return NextResponse.json({error: "Task does not exist"}, { status: 500})
    }
}

export async function PATCH(req: Request, {params}: {params : { id: string }}) {
    try {
        const body = await req.json();
        const task = await prisma.task.update({
            where: { id: params.id },
            data: body,
        })
        return NextResponse.json({task}, {status: 201})
    } catch (error) {
        return NextResponse.json({error: "Failed to update task"}, { status: 500 })
    }
}

export async function DELETE(_req: Request, {params}: {params: {id: string}}) {
    try {
        await prisma.task.delete({where: {id: params.id}});
        return NextResponse.json({ message: "Deleted task successfully"}, {status: 204})
    } catch (error) {
        return NextResponse.json({error: "Failed to delete task"}, {status: 500})
    }
}