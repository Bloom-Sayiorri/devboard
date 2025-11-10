import Image from "next/image";

export default function Home() {
	return (
		<div className="h-full">
			<h2>Home</h2>
			<div className="">
				<button type="submit" className="text-white bg-blue-400 rounded-lg px-4 py-2">
					Submit
				</button>
			</div>
		</div>
	);

}