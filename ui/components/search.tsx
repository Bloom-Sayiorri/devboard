"use client";

import { useState } from "react";

export default function Search() {
    const [ search, setSearch ] = useState<string>("");

	return (
		<form className="rounded-full">
			<input
				type="search"
				name="search"
				value={search}
				placeholder="Search"
                onChange={(e) => setSearch(e.target.value)}
				className="border-none px-2 py-2 text-center"
			/>
		</form>
	);
}