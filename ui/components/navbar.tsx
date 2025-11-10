// "use client";

// import Link from "next/link";
// import Logo from "./logo";
// import { Bell, CircleQuestionMark, Moon, Settings, SunMedium } from "lucide-react";
// import { IoMenu } from "react-icons/io5";
// import { useState } from "react";
// import Sidebar from "./sidebar";
// import { useSession, signOut } from "next-auth/react";

// export default function Navbar() {
// 	const [toggle, setToggle] = useState<boolean>(false);

// 	const handleToggle = () => {
// 		setToggle((prev) => !prev);
// 		console.log(toggle);
// 	};

// 	const { data: session } = useSession();

// 	const handleSignout = async () => {
// 		await signOut({ callbackUrl: "/login" });
// 	};

// 	return (
// 		<div className="relative">
// 			<header className="flex justify-between py-1.5 px-3">
// 				<div className="flex gap-3 items-center">
// 					<IoMenu className="h-8 w-7 cursor-pointer" onClick={handleToggle} />
// 					<Link href="/" className="">
// 						<Logo />
// 					</Link>
// 				</div>

// 				<nav className="flex gap-2">
// 					<div>
// 						<Link href="/">Home</Link>
// 						<Link href="/boards">Boards</Link>
// 						<Link href="/about">About</Link>
// 					</div>
// 					<div>
// 						{session?.user ? (
// 							<button onClick={handleSignout} className="text-red-500 hover:text-red-600">
// 								Sign Out
// 							</button>
// 						) : (
// 							<Link href="/login" className="text-blue-500 hover:text-blue-600">
// 								Login
// 							</Link>
// 						)}
// 					</div>
// 					{/* Puth these in a modal opened in mobile view */}
// 					<div className="flex">
// 						<Link href="/boards/notifications">
// 							<Bell />
// 						</Link>
// 						<Link href="/boards/help">
// 							<CircleQuestionMark />
// 						</Link>
// 						<Link href="/boards/settings">
// 							<Settings />
// 						</Link>
// 						<Link href="/boards/profile">profile</Link>
// 					</div>
// 				</nav>
// 			</header>
// 			{toggle ? <Sidebar /> : null}
// 		</div>
// 	);
// }

"use client";

import Link from "next/link";
import Logo from "./logo";
import { Bell, CircleQuestionMark, Moon, Settings, SunMedium, X } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "./sidebar";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const { data: session } = useSession();

	const handleSignout = async () => {
		await signOut({ callbackUrl: "/login" });
	};

	return (
		<header className="w-full border-b border-gray-200 bg-white dark:bg-gray-900 fixed top-0 left-0 z-50">
			<div className="flex justify-between items-center px-4 py-3 max-w-7xl mx-auto">
				{/* Left - Logo + Sidebar Toggle */}
				{/* <div className="flex items-center gap-3"> */}
				{/* Sidebar icon only visible on small screens */}
				{/* <IoMenu className="h-7 w-7 cursor-pointer sm:hidden" onClick={() => setSidebarOpen((prev) => !prev)} /> */}
				<Link href="/" className="flex items-center gap-1 text-lg font-semibold">
					<Logo />
				</Link>
				{/* </div> */}

				<h1 className="font-shortstack text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-500  to-blue-500 bg-clip-text text-transparent">
					Dev<span className="">Board</span>
				</h1>

				{/* Center Nav (hidden on mobile) */}
				<nav className="hidden sm:flex gap-6 items-center text-gray-800 dark:text-gray-200">
					<Link href="/">Home</Link>
					<Link href="/boards">Boards</Link>
					<Link href="/about">About</Link>
					{session?.user ? (
						<button onClick={handleSignout} className="text-red-500 hover:text-red-600 font-medium">
							Sign Out
						</button>
					) : (
						<Link href="/login" className="text-blue-500 hover:text-blue-600 font-medium">
							Login
						</Link>
					)}
				</nav>

				{/* Right icons (hidden on mobile) */}
				<div className="hidden sm:flex items-center gap-3 text-gray-700 dark:text-gray-300">
					<Link href="/boards/notifications">
						<Bell className="w-5 h-5" />
					</Link>
					<Link href="/boards/help">
						<CircleQuestionMark className="w-5 h-5" />
					</Link>
					<Link href="/boards/settings">
						<Settings className="w-5 h-5" />
					</Link>
					<Link href="/boards/profile" className="text-sm">
						Profile
					</Link>
				</div>

				{/* Mobile Menu Button */}
				<button
					className="sm:hidden flex items-center justify-center w-8 h-8 text-gray-800 dark:text-gray-200"
					onClick={() => setMenuOpen(true)}>
					<IoMenu className="w-6 h-6" />
				</button>
			</div>

			{/* Sidebar Drawer (Optional for your use case) */}
			{sidebarOpen && <Sidebar />}

			{/* Modal for Mobile Navigation */}
			{menuOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end">
					<div className="w-3/4 sm:w-1/3 bg-white dark:bg-gray-800 h-full p-6 flex flex-col justify-between">
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
							<button onClick={() => setMenuOpen(false)}>
								<X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
							</button>
						</div>

						{/* Nav Links */}
						<nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 text-lg">
							<Link href="/" onClick={() => setMenuOpen(false)}>
								Home
							</Link>
							<Link href="/boards" onClick={() => setMenuOpen(false)}>
								Boards
							</Link>
							<Link href="/about" onClick={() => setMenuOpen(false)}>
								About
							</Link>
							<hr className="border-gray-300 dark:border-gray-700" />
							{session?.user ? (
								<button
									onClick={() => {
										setMenuOpen(false);
										handleSignout();
									}}
									className="text-red-500 text-left">
									Sign Out
								</button>
							) : (
								<Link href="/login" onClick={() => setMenuOpen(false)}>
									Login
								</Link>
							)}
						</nav>

						{/* Icons at bottom */}
						<div className="flex justify-around mt-8 text-gray-600 dark:text-gray-300">
							<Link href="/boards/notifications" onClick={() => setMenuOpen(false)}>
								<Bell />
							</Link>
							<Link href="/boards/help" onClick={() => setMenuOpen(false)}>
								<CircleQuestionMark />
							</Link>
							<Link href="/boards/settings" onClick={() => setMenuOpen(false)}>
								<Settings />
							</Link>
							<Link href="/boards/profile" onClick={() => setMenuOpen(false)}>
								Profile
							</Link> 
						</div>
					</div>
				</div>
			)}
		</header>
	);

}