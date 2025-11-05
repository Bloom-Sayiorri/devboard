"use client";

import Link from "next/link";
import Logo from "./logo";
import { Bell, CircleQuestionMark, Moon, Settings, SunMedium } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { Fragment, useState } from "react";
import Sidebar from "./sidebar";

export default function Navbar() {
	const [toggle, setToggle] = useState<boolean>(false);

	const handleToggle = () => {
		setToggle((prev) => !prev);
		console.log(toggle);
	};

	return (
		<div className="relative">
			<header className="flex justify-between py-1.5 px-3">
				<div className="flex gap-3 items-center">
					<IoMenu className="h-8 w-7 cursor-pointer" onClick={handleToggle} />
					<Link href="/" className="">
						<Logo />
					</Link>
				</div>

				<nav className="flex gap-2">
					<Link href="/">Home</Link>
					<Link href="/boards">Boards</Link>
					<Link href="/about">About</Link>
					<Link href="/signup">Signup</Link>
				</nav>
				<nav className="flex gap-2">
					<Link href="/boards/notifications">
						<Bell />
					</Link>
					<Link href="/boards/help">
						<CircleQuestionMark />
					</Link>
					<Link href="/boards/settings">
						<Settings />
					</Link>
					<Link href="/boards/profile">profile</Link>
				</nav>
			</header>
			{toggle ? <Sidebar /> : null}
		</div>
	);
}

