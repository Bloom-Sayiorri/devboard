import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/themeContext";
import ClientLayoutWrapper from "./ClientLayoutWrapper";
import Providers from "./providers";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "DevBoard",
	description: "Collaborative productivity app",
	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
		other: {
			rel: "icon",
			url: "/android-chrome-192x192.png", // PWA / Android
			type: "image/png",
		},
	}
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen flex flex-col`}>
				<ThemeProvider>
					<Providers>
						<ClientLayoutWrapper>{children}</ClientLayoutWrapper>
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	);
}