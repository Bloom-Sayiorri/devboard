"use client";

import Link from "next/link";
import Logo from "./logo";
import { Bell, CircleQuestionMark, CircleUserRound, Moon, Settings, SunMedium, X } from "lucide-react";
import { IoMenu } from "react-icons/io5";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Sidebar from "./sidebar";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
	const router = useRouter();
	const pathname = usePathname();
	const [menuOpen, setMenuOpen] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data: session } = useSession();

	const handleSignout = async () => {
		await signOut({ callbackUrl: "/login" });
	};

	const links = [
		{ href: "/", label: "Home" },
		{ href: "/boards", label: "Boards" },
		{ href: "/about", label: "About" },
	];

	return (
		<header className="w-full border-b border-gray-200 bg-white dark:bg-gray-900">
			<div className="flex justify-between items-center px-3 py-3">
				<div className="flex gap-2 items-center justify-center">
					<Logo />
					<Link href="/" className="flex items-center gap-1 text-lg font-semibold">
						<h1 className="font-breeserif text-2xl sm:text-4xl font-bold bg-gradient-to-r from-blue-300 via-cyan-500  to-blue-500 bg-clip-text text-transparent">
							Dev<span className="">Board</span>
						</h1>
					</Link>
				</div>

				<nav className="hidden sm:flex gap-3 items-center text-gray-800 dark:text-gray-200">
					{links.map(({ href, label }) => {
						const isActive = pathname === href;

						return (
							<Link
								key={href}
								href={href}
								className={`font-medium transition ${
									isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-500"
								}`}>
								{label}
							</Link>
						);
					})}
					{session?.user ? (
						<button
							onClick={handleSignout}
							className="text-white bg-red-500 hover:text-red-600 hover:bg-transparent border border-red-600 px-4 py-1.5 rounded-lg">
							Sign Out
						</button>
					) : (
						<button
							disabled={session?.user ? true : false}
							onClick={() => router.push("/signup")}
							className="text-white bg-green-500 hover:text-green-600 hover:bg-transparent border hover:border-green-600 px-4 py-1.5 rounded-lg disabled:pointer-events-none">
							Signup
						</button>
					)}
					{
						<button
							className="relative w-10 h-10 rounded-full overflow-hidden shadow-md cursor-pointer flex items-center justify-center bg-gray-200 dark:bg-gray-700"
							onClick={() => setIsModalOpen((prev) => !prev)}>
							{/* If user has image */}
							{session?.user?.image ? (
								<Image src={session.user.image} alt="User" fill sizes="40px" className="object-cover rounded-full" />
							) : (
								<CircleUserRound className="w-7 h-7 text-gray-500" />
							)}
						</button>
					}
					{isModalOpen ? (
						<div className="absolute top-14 right-1 mt-2 w-38 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3 flex flex-col justify-center items-start gap-3 text-gray-700 dark:text-gray-300 z-50">
							{/* <Link
								href="/boards/analytics"
								className="flex items-center gap-2 hover:text-blue-500 transition"
								onClick={() => setIsModalOpen(false)}>
								<Bell className="w-4 h-4" /> Analytics
							</Link>
							<Link
								href="/boards/notifications"
								className="flex items-center gap-2 hover:text-blue-500 transition"
								onClick={() => setIsModalOpen(false)}>
								<Bell className="w-4 h-4" /> Notifications
							</Link>
							<Link
								href="/boards/settings"
								className="flex items-center gap-2 hover:text-blue-500 transition"
								onClick={() => setIsModalOpen(false)}>
								<Settings className="w-4 h-4" /> Settings
							</Link>
							<Link
								href="/boards/tasks"
								className="flex items-center gap-2 hover:text-blue-500 transition"
								onClick={() => setIsModalOpen(false)}>
								<CircleQuestionMark className="w-4 h-4" /> Tasks
							</Link> */}
							{session?.user ? (
								<Link
									href="/user/profile"
									className="flex items-center gap-2 hover:text-blue-500 transition"
									// onClick={() => setIsModalOpen(false)}
									>
									Profile
								</Link>
							) : (
								<></>
							)}
						</div>
					) : (
						<></>
					)}
				</nav>

				<button
					className="flex sm:hidden items-center justify-center w-8 h-8 text-gray-800 dark:text-gray-200 cursor-pointer"
					onClick={() => setMenuOpen(true)}>
					<IoMenu className="w-6 h-6" />
				</button>
			</div>

			{menuOpen && (
				<div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-end w-full">
					<div className="w-[70%] sm:w-1/3 bg-white dark:bg-gray-800 h-full p-6 flex flex-col justify-between">
						{/* Header */}
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Menu</h2>
							<button onClick={() => setMenuOpen(false)}>
								<X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
							</button>
						</div>

						{/* Nav Links */}
						<nav className="flex flex-col gap-4 text-gray-700 dark:text-gray-200 text-lg w-1/2">
							{links.map(({ href, label }) => {
								const isActive = pathname === href;

								return (
									<Link
										key={href}
										href={href}
										onClick={() => setMenuOpen(false)}
										className={`font-medium transition ${
											isActive ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-blue-500"
										}`}>
										{label}
									</Link>
								);
							})}
							<hr className="border-gray-300 dark:border-gray-700" />
							{session?.user ? (
								<button
									onClick={() => {
										setMenuOpen(false);
										handleSignout();
									}}
									className="text-white bg-red-500 hover:text-red-600 hover:bg-transparent border border-red-600 px-4 py-1.5 rounded-lg">
									Sign Out
								</button>
							) : (
								<Link
									href="/login"
									onClick={() => setMenuOpen(false)}
									className="text-white bg-green-500 hover:text-green-600 hover:bg-transparent border hover:border-green-600 px-4 py-1.5 rounded-lg">
									Login
								</Link>
							)}
						</nav>

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
