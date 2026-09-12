import { X } from "lucide-react";

export default function Modal({ toggleModal }: { toggleModal: () => void }) {
	return (
		<div className="bg-[#e6e2e2] flex flex-col justify-around items-center gap-0.5 w-68 md:w-125 h-3/4 rounded-lg border-2 border-red-500">
			<h1 className="inline-block font-bold text-center mt-2.5">Page is under construction.</h1>
			<button type="button" onClick={toggleModal} className="">
				<X className="text-red-500 w-10 h-10" />
			</button>
		</div>
	);
}