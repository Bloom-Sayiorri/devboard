// export default function Page() {
//     return (
//         <div>About</div>
//     );
// }

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
	return (
		<section className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-gray-100">
			{/* Hero */}
			<div className="max-w-5xl text-center mb-12">
				<motion.h1
					initial={{ opacity: 0, y: -20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
					About DevBoard
					{/* <span className="text-gray-800 dark:text-gray-100">DevBoard</span> */}
				</motion.h1>
				<p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
					DevBoard helps teams plan, track, and ship projects faster. Built for developers, by developers — with
					seamless collaboration, kanban boards, and real-time updates.
				</p>
			</div>

			{/* Features / Mission Section */}
			<div className="grid md:grid-cols-3 gap-8 max-w-5xl w-full">
				{[
					{
						title: "Collaborative Boards",
						desc: "Organize work visually with drag-and-drop boards that make project tracking intuitive and transparent.",
						icon: "🧩",
					},
					{
						title: "Real-Time Sync",
						desc: "Stay in sync with your team using live updates powered by WebSockets — no refresh needed.",
						icon: "⚡",
					},
					{
						title: "Integrations",
						desc: "Connect your favorite tools like GitHub, Slack, and Notion to streamline your workflow.",
						icon: "🔗",
					},
				].map((feature, index) => (
					<motion.div
						key={index}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.2 }}
						className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-6 hover:shadow-xl transition">
						<div className="text-4xl mb-3">{feature.icon}</div>
						<h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
						<p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
					</motion.div>
				))}
			</div>

			{/* Team / Creator Section */}
			<div className="max-w-4xl mt-16 text-center">
				<h2 className="text-3xl font-semibold mb-6">Meet the Creator</h2>
				<div className="flex flex-col md:flex-row items-center justify-center gap-8">
					<div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md">
						<Image src="/profile.jpg" alt="Creator" fill sizes="128px" className="object-cover rounded-full" />
					</div>
					<div className="text-left max-w-md">
						<h3 className="text-2xl font-semibold">Bloom Tauta</h3>
						<p className="text-gray-600 dark:text-gray-400">
							A passionate full-stack developer focused on building scalable and intelligent web applications. DevBoard
							is a reflection of my mission to make project management seamless for engineering teams.
						</p>
						<div className="flex gap-4 mt-4">
							<Link href="https://github.com/" target="_blank" className="text-blue-500 hover:underline">
								GitHub
							</Link>
							<Link href="https://linkedin.com/" target="_blank" className="text-blue-500 hover:underline">
								LinkedIn
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* CTA */}
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3 }}
				className="mt-20 text-center">
				<h2 className="text-2xl font-semibold mb-4">Ready to streamline your workflow?</h2>
				<Link
					href="/signup"
					className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
					Get Started
				</Link>
			</motion.div>
		</section>
	);
}

