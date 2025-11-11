import Link from "next/link";

export default function Footer() {
	return (
		<footer className="bg-blue-600 text-white py-10 px-6 text-center">
			<h3 className="text-2xl font-semibold mb-4">Ready to get started?</h3>
			<p className="text-gray-100 mb-6">Join thousands of developers organizing their work on Devboard.</p>
			<Link
				href="/signup"
				className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
				Sign Up Now
			</Link>
			<p className="mt-6 text-gray-200 text-sm">© {new Date().getFullYear()} Devboard. All rights reserved.</p>
		</footer>
	);
}