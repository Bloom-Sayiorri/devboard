"use client";

import { usePathname } from "next/navigation";
import Footer from "@/ui/components/footer";
import Navbar from "@/ui/components/navbar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname();
	const hideLayout = ["/login", "/signup"].includes(pathname);

	return (
		<>
			{!hideLayout && <Navbar />}
			<main className="flex-grow">{children}</main>
			{!hideLayout && <Footer />}
		</>
	);
}