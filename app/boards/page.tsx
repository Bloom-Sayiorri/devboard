"use client";

import { useState } from "react";
import Sidenav from "@/ui/boards/sidenav";
import { LayoutDashboard } from "lucide-react";
import Board from "@/ui/boards/boards";

export default function Page() {
	const [open, setOpen] = useState<boolean>(false);

	const handleClick = () => {
		setOpen((prev) => !prev);
		console.log(open);
	};

	return (
		<div className="flex flex-col gap-2 h-full px-3">
			{/* <header className="flex items-center justify-between">
				<div className="flex gap-2">
					<span className="">My board</span>
					<LayoutDashboard className="cursor-pointer" onClick={handleClick} />
					{open && <Sidenav />}
				</div>
				<nav className="">
					<p>Where</p>
				</nav>
			</header>

			<div className="">
				<p>Boards</p>
			</div> */}
			<Board />
		</div>
	);
}

/*
    NAV SECTION
    SIDEBAR
    BOARDS
    FOOTER ( INBOX, PLANNER, TABLE )

*/
