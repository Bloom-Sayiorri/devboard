import { SignUp } from "@clerk/nextjs";

export default function Signup() {

	return (
		<div className="flex flex-col items-center justify-center h-full w-full">
			<h1 className="text-3xl font-bold mb-3">Signup</h1>
			<SignUp />
		</div>
	);
}