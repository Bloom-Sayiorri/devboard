// import Image from "next/image";

// export default function Home() {
// 	return (
// 		<div className="h-full">
// 			<h2>Home</h2>
// 			<div className="">
// 				<button type="submit" className="text-white bg-blue-400 rounded-lg px-4 py-2">
// 					Submit
// 				</button>
// 			</div>
// 		</div>
// 	);
// }

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle, Bell, LayoutGrid, Users } from "lucide-react";

export default function HomePage() {
	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero Section */}
			<section className="flex flex-col items-center justify-center text-center px-6 py-20 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 text-white">
				<motion.h1
					className="text-4xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200"
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}>
					Collaborate. Plan. Ship — Effortlessly.
				</motion.h1>
				<p className="mt-4 max-w-xl text-lg md:text-xl text-gray-100">
					Devboard helps teams stay organized and deliver projects faster with boards, sprints, and real-time updates.
				</p>

				<div className="mt-8 flex gap-4 flex-wrap justify-center">
					<Link
						href="/signup"
						className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
						Get Started Free
					</Link>
					<Link
						href="/login"
						className="border border-white px-6 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition">
						Log In
					</Link>
				</div>
			</section>

			{/* Features */}
			<section className="px-6 py-16 bg-white text-gray-800">
				<h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Devboard?</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					{[
						{
							icon: LayoutGrid,
							title: "Organize Boards",
							desc: "Create and manage your projects visually with draggable task boards.",
						},
						{
							icon: CheckCircle,
							title: "Track Progress",
							desc: "Stay on top of deadlines with sprints and subtasks.",
						},
						{
							icon: Bell,
							title: "Stay Updated",
							desc: "Get instant notifications for team activities.",
						},
						{
							icon: Users,
							title: "Collaborate",
							desc: "Work together in real-time with seamless updates across devices.",
						},
					].map((feature, idx) => (
						<motion.div
							key={idx}
							whileHover={{ y: -5 }}
							className="p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition bg-white">
							<feature.icon className="w-10 h-10 text-blue-500 mb-3" />
							<h3 className="font-semibold text-xl mb-2">{feature.title}</h3>
							<p className="text-gray-600 text-sm">{feature.desc}</p>
						</motion.div>
					))}
				</div>
			</section>

			{/* Preview Section */}
			<section className="bg-gray-50 py-16 px-6 flex flex-col items-center text-center">
				<h2 className="text-3xl font-bold mb-6">Plan visually with drag-and-drop boards</h2>
				<p className="max-w-2xl text-gray-600 mb-10">
					Devboard makes project tracking easy — move tasks, assign teammates, and monitor sprint progress in real-time.
				</p>
				<div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden border-2 border-gray-200 shadow-md bg-gray-100">
					{/* You could replace this div with an image or animated demo later */}
					<div className="flex items-center justify-center h-full text-gray-400 italic">Board Preview Coming Soon</div>
				</div>
			</section>
		</div>
	);
}