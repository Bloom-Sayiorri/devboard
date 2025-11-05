import { SignIn } from "@clerk/nextjs";

export default function Page() {
	return (
		<div className="flex flex-col items-center justify-center h-full">
			<h1 className="text-3xl font-bold mb-3">Login</h1>
			<SignIn />
		</div>
	);
}