"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { createTeam } from "@/lib/actions";

const TeamForm = () => {
	const ref = useRef<HTMLFormElement>(null);
	return (
		<form
			ref={ref}
			action={async (formData) => {
				ref.current?.reset();
				const error = await createTeam(formData);
				if (error) {
					alert(error.message);
				} else {
					alert("Team added successfully");
				}
			}}
			className="flex flex-col"
		>
			<Label htmlFor="team_name">Enter team name:</Label>
			<input
				type="text"
				name="team_name"
				placeholder="Enter team name..."
				className="rounded-md mx-2 p-1 my-2"
				required
			/>
			<Label htmlFor="member1">Member 1:</Label>
			<input
				type="text"
				name="member1"
				placeholder="Enter Member ID..."
				className="rounded-md mx-2 p-1 my-2"
				required
			/>
			<Label htmlFor="member2">Member 2:</Label>
			<input
				type="text"
				name="member2"
				placeholder="Enter Member ID..."
				className="rounded-md mx-2 p-1 my-2"
				required
			/>
			<Label htmlFor="member3">Member 3:</Label>
			<input
				type="text"
				name="member3"
				placeholder="Enter Member ID..."
				className="rounded-md mx-2 p-1 my-2"
				required
			/>
			<Button
				variant={"outline"}
				type="submit"
			>
				Submit
			</Button>
		</form>
	);
};

export default TeamForm;
