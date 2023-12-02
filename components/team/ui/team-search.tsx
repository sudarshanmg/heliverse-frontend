"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function TeamSearch({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const searchString = `${pathname}`;

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("team", term);
		} else {
			params.delete("team");
		}
		replace(searchString + `?${params.toString()}`);
	}, 300);

	return (
		<div className="w-3/5 m-auto">
			Search teams
			<div className="relative flex flex-1 flex-shrink-0">
				<label
					htmlFor="search"
					className="sr-only"
				>
					Search
				</label>
				<input
					className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
					placeholder={placeholder}
					onChange={(e) => {
						handleSearch(e.target.value);
					}}
					defaultValue={searchParams.get("team")?.toString()}
				/>
				<SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
			</div>
		</div>
	);
}
