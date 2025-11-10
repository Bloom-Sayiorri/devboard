import { prisma } from "@/lib/prisma";
import { hash } from "bcrypt";

export async function POST(req: Request) {
	const { name, email, password } = await req.json();

	if (!email || !password) {
		return new Response(JSON.stringify({ error: "Email and password are required" }), { status: 400 });
	}
	const existingUser = await prisma.user.findUnique({ where: { email } });
	if (existingUser) {
		return new Response(JSON.stringify({ error: "User already exists" }), { status: 400 });
	}
	const hashedPassword = await hash(password, 10);
	const user = await prisma.user.create({
		data: { name, email, password: hashedPassword },
	});

	return new Response(JSON.stringify({ message: "User created successfully", userId: user.id }), { status: 201 });
}
