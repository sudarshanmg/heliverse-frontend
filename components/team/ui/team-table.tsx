import { fetchTeams } from "@/lib/data";
import { type Team } from "@/lib/types";
import TeamContainer from "./team-container";

const TeamTable = async ({ name }: { name: string }) => {
	const data = await fetchTeams(name);

	return (
		<div className="m-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
			{data?.map((team: Team) => (
				<TeamContainer team={team} />
			))}
		</div>
	);
};

export default TeamTable;
