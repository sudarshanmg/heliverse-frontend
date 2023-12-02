import { type Team } from "@/lib/types";
import { Chakra_Petch } from "next/font/google";
import Image from "next/image";

const TeamContainer = ({ team, key }: { team: Team; key: string }) => {
	return (
		<div
			className="flex flex-col md:flex-row border rounded-lg gap-y-2 items-center justify-evenly m-2 p-4"
			key={key}
		>
			<div
				className="bg-neutral-600 rounded-full overflow-clip flex md:flex-col"
				key={key}
			>
				{team.members.map((member) => (
					<Image
						key={member.id}
						src={member.avatar}
						alt="avatar"
						width={55}
						height={55}
					/>
				))}
			</div>
			<div className="flex flex-col text-neutral-400 font-mono font-thin">
				<div>
					Team name:{" "}
					<span className={`font-bold text-lime-300`}>{team.name}</span>
				</div>
				<div>
					Members:{" "}
					{team.members.map((member) => (
						<div key={member._id}>
							<div>
								Name:{" "}
								<span className={`font-bold text-neutral-300`}>
									{member.first_name} {member.last_name}
								</span>
							</div>

							<div>
								Domain:{" "}
								<span className={`font-bold text-neutral-300`}>
									{member.domain}
								</span>
							</div>
							<div>
								Email:{" "}
								<span className={`font-bold text-neutral-300`}>
									{member.email}
								</span>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default TeamContainer;
