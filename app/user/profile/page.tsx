"use client";

import { UserWithDetails } from "@/types/user";
import Modal from "@/ui/components/modal";
import { CircleUserRound } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
	const router = useRouter();
	const { data: session } = useSession();
	const userId = session?.user?.id;

	const [user, setUser] = useState<UserWithDetails | null>();

	const [isModalOpen, setIsModalOpen] = useState(false);

	function toggleModal() {
		setIsModalOpen((prev) => !prev);
		router.back();
	}

	useEffect(() => {
		if (!userId) return;
		async function getUser() {
			const res = await fetch(`/api/users/${userId}`);
			if (!res.ok) {
				console.error("Failed to fetch user:", res.status, res.body);
				return;
			}
			const data = await res.json();
			setUser(data);
			// console.log(data);
		}
		getUser();
	}, [userId]);

	return (
		<div className="h-full">
			{isModalOpen ? (
				<section className="border-b border-b-gray-400">
					<h2 className="font-bold text-black">Hi, {user?.name}</h2>
					{user?.image ? (
						<Image
							src={user.image}
							alt={user.name ?? "User"}
							width={40}
							height={40}
							className="object-cover rounded-full"
						/>
					) : (
						<CircleUserRound className="w-7 h-7 text-gray-500" />
					)}
					{user?.image}
				</section>
			) : (
				<div className="h-full w-full flex flex-col justify-center items-center border-2 border-red-500">
					<Modal toggleModal={toggleModal} />
				</div>
			)}
		</div>
	);
}

{
	/* <div className="flex gap-3">
					<button type="button" onClick={() => router.push("/settings")} className="">
						Change password
					</button>
					<button type="button" onClick={() => router.push("/settings")} className="primaryBtn">
						Edit profile
					</button>
				</div> */
}

{
	/*<div className="">
				<div className="">
					<Image src="/devboardimg.jpg" alt="profile" height={100} width={70} className="" />
				</div>
				<div className="">
					<section className="">
						personal details 
						<div className="">
							<span className="profileTitle">full name</span>
							<h3 className="">Jessica James</h3>
						</div>
						<div>
							<div className="">
								<h6 className="profileTitle">date of birth</h6>
								<p className="">04/02/1991</p>
								<p className="">32 years old</p>
							</div>
							<div className="">
								<h6 className="profileTitle">home address</h6>
								<p className="">120 26th street</p>
								<p className="">New York, US</p>
							</div>
							<div className="">
								<h6 className="profileTitle">date of birth</h6>
								<p className="">jessica_jones@mail.com</p>
								<p className="">+1-123-456-789</p>
							</div>
						</div>
					</section>
					<section className="">
						insurance
						<h3 className="">Insurance Informaton</h3>
						<div>
							<div className="">
								<h6 className="profileTitle">insurance company</h6>
								<p className="">Medical Care</p>
							</div>
							<div className="">
								<h6 className="">plan</h6>
								<p className="">Silver 430</p>
							</div>
							<div className="">
								<h6 className="">insurance id</h6>
								<p className="">00123456789-12</p>
							</div>
						</div>
					</section>
					<section className="">
						data
						<h3>Your doctors</h3>
						<div className="">
							<div className="">
								<h6 className="profileTitle">physician</h6>
								<p className="">Mario Evans</p>
								<p className="">Peter Ackles</p>
							</div>
							<div className="">
								<h6 className="profileTitle">speciality</h6>
								<p className="">Family Medicine</p>
								<p className="">Cardiology</p>
							</div>
							<div className="">
								<h6 className="profileTitle">last visit</h6>
								<p className="">10/20/2025</p>
								<p className="">06/30/2025</p>
							</div>
						</div>
					</section>
					<section className="">
						billing
						<h3 className="">Billing</h3>
						<div className="">
							<div className="">
								<h6 className="profileTitle">date</h6>
								<p className="">07/02/2025</p>
								<p className="">09/12/2025</p>
							</div>
							<div className="">
								<h6 className="profileTitle">details</h6>
								<p className="">Specific blood test</p>
								<p className="">X-ray test</p>
							</div>
							<div className="">
								<h6 className="profileTitle">total</h6>
								<p className="">$50</p>
								<p className="">$100</p>
							</div>
							<div className="">
								<p className="">Download Invoice</p>
								<p className="">Download Invoice</p>
							</div>
						</div>
					</section>
				</div>
			</div>*/
}


