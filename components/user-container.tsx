"use client";
import { type User } from "@/lib/types";

import Image from "next/image";
import { Button } from "./ui/button";
import { useState } from "react";

const UserContainer = ({
	user,
	forTeam,
}: {
	user: User;
	forTeam?: boolean;
}) => {
	const [members, setMembers] = useState<string[]>([]);

	return (
		<div className=" flex flex-col md:flex-row border rounded-lg gap-y-2 items-center justify-evenly m-2 p-4">
			<div className="bg-neutral-600 rounded-full overflow-clip">
				<Image
					src={user.avatar}
					alt="avatar"
					width={60}
					height={60}
				/>
			</div>
			<div className="flex flex-col text-neutral-400 font-mono font-thin">
				<div>
					Name:{" "}
					<span className={`font-bold text-lime-300`}>
						{user.first_name} {user.last_name}
					</span>
				</div>
				<div>
					ID: <span className={`font-thin text-blue-100`}>{user._id}</span>
				</div>
				<div>
					Email:{" "}
					<span className={`font-bold text-neutral-300`}>{user.email}</span>
				</div>
				<div>
					Available:{" "}
					<span className={`font-bold text-neutral-300`}>
						{user.available ? "Yes" : "No"}
					</span>
				</div>
				<div>
					Domain:{" "}
					<span className={`font-bold text-neutral-300`}>{user.domain}</span>
				</div>
				<div>
					Pronouns:{" "}
					<span className={`font-bold text-neutral-300`}>
						{user.gender === "Male" ? "He/him" : "She/her"}
					</span>
				</div>
			</div>
		</div>
	);
};

export default UserContainer;
