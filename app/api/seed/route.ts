import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@example.com",
        password: "hashed_password_here",
      },
    });

    const board = await prisma.board.create({
      data: {
        name: "Dev Board",
        description: "Project Workspace",
        members: {
          create: {
            userId: user.id,
            role: "ADMIN",
          },
        },
      },
    });

    const sprint = await prisma.sprint.create({
      data: {
        name: "Sprint 1",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        boardId: board.id,
      },
    });

    const task = await prisma.task.create({
      data: {
        title: "Setup Project",
        description: "Initialize Next + Prisma",
        boardId: board.id,
        sprintId: sprint.id,
        assignedToId: user.id,
      },
    });

    await prisma.task.create({
      data: {
        title: "Install Dependencies",
        boardId: board.id,
        sprintId: sprint.id,
        parentTaskId: task.id,
        assignedToId: user.id,
      },
    });

    await prisma.notification.create({
      data: {
        message: "Welcome to DevBoard!",
        userId: user.id,
      },
    });

    return NextResponse.json({ message: "Seed complete!" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}