"use client";

import Link from "next/link";
import Logo from "./logo";
import { Bell, CircleQuestionMark, Moon, Settings, SunMedium } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import Sidebar from "./sidebar";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
	const [toggle, setToggle] = useState<boolean>(false);

	const handleToggle = () => {
		setToggle((prev) => !prev);
		console.log(toggle);
	};

	const { data: session } = useSession();

	const handleSignout = async () => {
		await signOut({ callbackUrl: "/login" });
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
					<div>
						<Link href="/">Home</Link>
						<Link href="/boards">Boards</Link>
						<Link href="/about">About</Link>
					</div>
					<div>
						{session?.user ? (
							<button onClick={handleSignout} className="text-red-500 hover:text-red-600">
								Sign Out
							</button>
						) : (
							<Link href="/login" className="text-blue-500 hover:text-blue-600">
								Login
							</Link>
						)}
					</div>
					<div className="flex">
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
					</div>
				</nav>
			</header>
			{toggle ? <Sidebar /> : null}
		</div>
	);
}