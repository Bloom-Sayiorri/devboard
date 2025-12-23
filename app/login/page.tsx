"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";

export default function LoginPage() {
	const router = useRouter();
	const { status } = useSession();
	const [userData, setUserData] = useState({ email: "", password: "" });
	const [errors, setErrors] = useState("");

	useEffect(() => {
		if (status === "authenticated") {
			router.push("/");
		}
	}, [status, router]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setUserData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const res = await signIn("credentials", {
			redirect: false,
			email: userData.email,
			password: userData.password,
		});

		if (res?.error) setErrors("Invalid email or password");
		else setErrors("");
	};

	return (
		<main className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-300 via-cyan-500 to-blue-400 px-4 sm:px-6">
			<section className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-6">
				<div className="text-center">
					<h1 className="text-3xl sm:text-4xl font-bold text-blue-600">Welcome Back 👋</h1>
					<p className="text-slate-600 mt-2">Sign in to continue to DevBoard</p>
				</div>

				<button
					type="button"
					onClick={() => signIn("google", { callbackUrl: "/boards" })}
					className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 text-gray-700 font-medium hover:bg-blue-600 hover:text-white transition duration-200">
					<FcGoogle className="text-xl" />
					<span>Sign in with Google</span>
				</button>

				<div className="flex items-center gap-3">
					<hr className="flex-1 border-gray-300" />
					<span className="text-gray-500 text-sm">OR</span>
					<hr className="flex-1 border-gray-300" />
				</div>

				<form onSubmit={handleSubmit} className="flex flex-col gap-4">
					<div>
						<label htmlFor="email" className="block text-sm font-medium text-gray-700">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={userData.email}
							onChange={handleChange}
							placeholder="you@example.com"
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						/>
					</div>

					<div>
						<label htmlFor="password" className="block text-sm font-medium text-gray-700">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={userData.password}
							onChange={handleChange}
							placeholder="••••••••"
							className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
							required
						/>
					</div>

					<button
						type="submit"
						className="mt-2 w-full bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 transition">
						Submit
					</button>

					{errors && <p className="text-red-500 text-sm text-center mt-2">{errors}</p>}
				</form>

				<p className="text-center text-gray-600 text-sm mt-2">
					Don’t have an account?{" "}
					<Link href="/signup" className="text-blue-600 hover:underline">
						Sign up
					</Link>
				</p>
			</section>
		</main>
	);
}