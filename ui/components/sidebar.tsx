import Link from "next/link";

import {
	MdAnalytics,
	MdAttachMoney,
	MdDashboard,
	MdHelpCenter,
	MdOutlineSettings,
	MdPeople,
	MdShoppingBag,
	MdSupervisedUserCircle,
	MdWork,
} from "react-icons/md";

const menuItems = [
	{
		title: "Pages",
		list: [
			{
				title: "Pages",
				path: "/dahsboard",
				icon: <MdDashboard />,
			},
			{
				title: "Users",
				path: "/dahsboard/users",
				icon: <MdSupervisedUserCircle />,
			},
			{
				title: "Products",
				path: "/dahsboard/products",
				icon: <MdShoppingBag />,
			},
			{
				title: "Transcations",
				path: "/dahsboard/transactions",
				icon: <MdAttachMoney />,
			},
			{
				title: "Analytics",
				path: "/dahsboard/analytics",
				icon: <MdAttachMoney />,
			},
		],
	},
	{
		title: "Analytics",
		list: [
			{
				title: "Revenue",
				path: "dashboard/revenue",
				icon: <MdWork />,
			},
			{
				title: "Reports",
				path: "dashboard/reports",
				icon: <MdAnalytics />,
			},
			{
				title: "Teams",
				path: "dashboard/teams",
				icon: <MdPeople />,
			},
		],
	},
	{
		title: "User",
		list: [
			{
				title: "Settings",
				path: "dashboard/settings",
				icon: <MdOutlineSettings />,
			},
			{
				title: "Help",
				path: "dashboard/help",
				icon: <MdHelpCenter />,
			},
		],
	},
];

export default function Sidebar() {

	return (
		<div className="flex flex-col justify-center bg-slate-300 rounded w-40 h-full fixed top-11 left-0 z-50">
			<ul className="pl-2">
				{menuItems.map((items, index) => {
					return (
						<li key={index} className="my-8">
							<span className="text-xl font-bold">{items.title}</span>
							{items.list.map((item, index) => (
								<Link key={index} href={item.path} className="flex items-center gap-1 py-2">
									{item.icon} {item.title}
								</Link>
							))}
						</li>
					);
				})}
			</ul>
		</div>
	)
}