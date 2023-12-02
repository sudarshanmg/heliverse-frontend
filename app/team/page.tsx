import TeamSearch from "@/components/team/ui/team-search";
import TeamTable from "@/components/team/ui/team-table";
import { Button } from "@/components/ui/button";
import UserTable from "@/components/user-table";
import UsersSearch from "@/components/ui/user-search";
import Link from "next/link";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TeamForm from "@/components/team/ui/team-form";

const Page = ({
	searchParams,
}: {
	searchParams?: {
		team?: string;
		name?: string;
		page?: string;
		gender?: string;
		domains?: string;
	};
}) => {
	const team = searchParams?.team || "";
	const name = searchParams?.name || "";
	const currentPage = Number(searchParams?.page) || 1;
	const gender = searchParams?.gender || "";
	const domains = searchParams?.domains || "";

	return (
		<div className="m-4">
			<header className="font-serif text-2xl md:text-5xl w-full text-center m-4">
				Teams
			</header>
			<div className="flex items-center justify-around text-base">
				<Link
					href={"/"}
					className="p-2 rounded-md hover:bg-neutral-500 transition-all delay-100"
				>
					Home
				</Link>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant={"outline"}>Create Team</Button>
					</DialogTrigger>
					<DialogContent className="max-h-[40rem] overflow-y-scroll">
						<DialogHeader>
							<DialogTitle>Create a team</DialogTitle>
							<DialogDescription>
								Make sure that the name is unique and members are of different
								domains
							</DialogDescription>
						</DialogHeader>
						<div>
							<TeamForm />
						</div>
						<div>
							<UsersSearch
								placeholder="Search user by name..."
								forTeam
							/>

							<UserTable
								name={name}
								page={currentPage}
								gender={gender}
								domains={domains}
								forTeam
							/>
						</div>
					</DialogContent>
				</Dialog>
			</div>

			<TeamSearch placeholder="Search by team name..." />
			<TeamTable name={team} />
		</div>
	);
};

export default Page;
