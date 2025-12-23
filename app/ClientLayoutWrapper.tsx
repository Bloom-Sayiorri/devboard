"use client";

import { usePathname } from "next/navigation";
import Footer from "@/ui/components/footer";
import Navbar from "@/ui/components/navbar";
import { SessionProvider } from "next-auth/react";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const hideLayout = ["/login", "/signup"].includes(pathname);

	return (
		<>
			<SessionProvider>
				{!hideLayout && <Navbar />}
				<main className="flex-grow">{children}</main>
				{!hideLayout && <Footer />}
			</SessionProvider>
		</>
	);
}