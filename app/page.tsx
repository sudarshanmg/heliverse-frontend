import UsersSearch from "@/components/ui/user-search";
import UserTable from "@/components/user-table";
import Link from "next/link";

export default async function Home({
	searchParams,
}: {
	searchParams?: {
		name?: string;
		page?: string;
		gender?: string;
		available?: string;
		domains?: string;
	};
}) {
	const name = searchParams?.name || "";
	const currentPage = Number(searchParams?.page) || 1;
	const gender = searchParams?.gender || "";
	const available = searchParams?.available || undefined;
	const domains = searchParams?.domains || "";

	return (
		<div className="m-4">
			<header className="font-serif text-2xl md:text-5xl m-auto w-full text-center">
				Heliverse Assignment
			</header>
			<UsersSearch
				placeholder="Search by name..."
				showAvailability
			/>
			<div className="text-center p-4 mt-4">
				<Link
					href={"/team"}
					className="p-2 rounded-md hover:bg-neutral-500 transition-all delay-100 border"
				>
					{" "}
					Go to teams
				</Link>
			</div>
			<UserTable
				name={name}
				page={currentPage}
				gender={gender}
				available={available}
				domains={domains}
			/>
		</div>
	);
}
