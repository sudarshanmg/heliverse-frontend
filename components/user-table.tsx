import { fetchFilteredUsers } from "@/lib/data";
import UserContainer from "./user-container";
import Pagination from "./ui/pagination";
import { type User } from "@/lib/types";
import { cn } from "@/lib/utils";

type UserTableProps = {
	name?: string;
	page?: number;
	gender?: string;
	domains?: string;
	available?: string;

	forTeam?: boolean;
};

const UserTable = async ({
	name,
	gender,
	domains,
	available,
	page,
	forTeam,
}: UserTableProps) => {
	const data = await fetchFilteredUsers(
		name,
		gender,
		available !== undefined ? available === "true" : undefined,
		domains,
		page
	);

	return (
		<>
			<div className="mt-5 flex w-full justify-center">
				<Pagination totalPages={data.totalPages} />
			</div>
			<div
				className={cn(
					"m-4 grid grid-cols-1   gap-4",
					!forTeam && "sm:grid-cols-2 md:grid-cols-3"
				)}
			>
				{data?.users?.map((user: User) => (
					<UserContainer
						user={user}
						key={user.id}
						forTeam={forTeam}
					/>
				))}
			</div>
		</>
	);
};

export default UserTable;
