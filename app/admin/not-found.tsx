import Link from "next/link";

export default function NotFound() {
	return (
		<div className="h-full flex flex-col justify-center items-center gap-4">
			<h1 className="text-black font-semibold text-4xl">404 - Page Not Found</h1>
			<p className="text-slate-400 text-lg">This page does not exist.</p>
			<Link href="/" className=" px-3 py-2 text-blue-400 bg-white border rounded-lg font-medium text-md text-md hover:text-white hover:bg-blue-400">Home</Link>
		</div>
	);
}