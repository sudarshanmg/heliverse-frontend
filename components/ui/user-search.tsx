"use client";

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { domains } from "@/lib/domains";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { ChevronDown, SearchIcon } from "lucide-react";
import { Checkbox } from "./checkbox";
import { Label } from "./label";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function UsersSearch({
	placeholder,
	showAvailability,
	forTeam,
}: {
	placeholder: string;
	showAvailability?: boolean;
	forTeam?: boolean;
}) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const [selectedDomains, setSelectedDomains] = useState<string[]>([]);

	const searchString = `${pathname}`;

	const handleSearch = useDebouncedCallback((term: string) => {
		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set("name", term);
		} else {
			params.delete("name");
		}
		replace(searchString + `?${params.toString()}`);
	}, 300);

	const handleGender = (gender: string) => {
		const params = new URLSearchParams(searchParams);
		if (gender !== "null") {
			params.set("gender", gender);
		} else {
			params.delete("gender");
		}
		replace(searchString + `?${params.toString()}`);
	};

	const handleAvailability = (available: string) => {
		const params = new URLSearchParams(searchParams);
		if (available != "null") {
			params.set("available", available);
		} else {
			params.delete("available");
		}

		replace(searchString + `?${params.toString()}`);
	};

	useEffect(() => {
		const params = new URLSearchParams(searchParams);
		if (selectedDomains.length !== 0) {
			params.set("domains", selectedDomains.join(","));
		} else {
			params.delete("domains");
		}
		replace(searchString + `?${params.toString()}`);
	}, [selectedDomains]);

	const handleCheckboxChange = (domain: string) => {
		console.log(domain);

		setSelectedDomains((prevSelectedDomains) => {
			if (prevSelectedDomains.includes(domain)) {
				return prevSelectedDomains.filter(
					(selectedDomain) => selectedDomain !== domain
				);
			} else {
				return [...prevSelectedDomains, domain];
			}
		});
	};

	return (
		<div className="w-3/5 m-auto">
			Search users
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
					defaultValue={searchParams.get("name")?.toString()}
				/>
				<SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
			</div>
			<div>
				<div className="py-4">Add Filters</div>
				<div
					className={cn(
						"flex flex-col items-center gap-y-2",
						!forTeam && "md:flex-row md:justify-between"
					)}
				>
					<Select
						onValueChange={(value) => {
							handleGender(value);
						}}
						defaultValue={searchParams.get("gender")?.toString()}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Gender" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="Male">Male</SelectItem>
							<SelectItem value="Female">Female</SelectItem>
							<SelectItem value="null">No preference</SelectItem>
						</SelectContent>
					</Select>
					{showAvailability && (
						<Select
							onValueChange={(value) => {
								handleAvailability(value);
							}}
							defaultValue={searchParams.get("available")?.toString()}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Availability" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="true">Available</SelectItem>
								<SelectItem value="false">Not available</SelectItem>
								<SelectItem value="null">No preference</SelectItem>
							</SelectContent>
						</Select>
					)}
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="outline">
								Select domains
								<ChevronDown className="h-4 w-4 ml-4 opacity-50" />
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="grid gap-4">
								<div className="space-y-2">
									<h4 className="font-medium leading-none">Domains</h4>
									<p className="text-sm text-muted-foreground">
										Select any number of domains.
									</p>
								</div>
								<div className="grid gap-2">
									{domains.map((domain) => (
										<div
											className="grid grid-cols-3 items-center gap-4"
											key={domain}
										>
											<Checkbox
												checked={selectedDomains.includes(domain)}
												name={domain}
												onCheckedChange={() => {
													handleCheckboxChange(domain);
												}}
											/>
											<Label htmlFor={domain}>{domain}</Label>
										</div>
									))}
								</div>
							</div>
						</PopoverContent>
					</Popover>
					<Button
						variant={"ghost"}
						onClick={() => {
							replace(`${pathname}`);
						}}
					>
						Clear Filters
					</Button>
				</div>
			</div>
		</div>
	);
}
