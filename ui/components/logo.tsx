"use client"
import Image from "next/image";

export default function Logo() {
	return <><Image src="/logo.png" alt="logo" width={30} height={30} style={{height: "auto", width: "auto"}} className="object-cover bg-white rounded-full"/></>;
}