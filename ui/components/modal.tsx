import { X } from "lucide-react";

export default function Modal({ toggleModal }: { toggleModal: () => void }) {
	return (
		<div className="bg-slate-300 flex flex-col justify-center items-center w-68 md:w-125 h-3/4 rounded-lg">
			<h1 className="text-4xl text-center mt-2.5">Page is under construction.</h1>
			<button type="button" onClick={toggleModal} className="mt-10">
				<X className="text-red-500 w-10 h-10" />
			</button>
		</div>
	);
}