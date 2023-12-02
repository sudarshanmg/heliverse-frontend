"use server";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const createTeam = async (formData: FormData) => {
	const name = formData.get("team_name");
	const memberUserIds = [
		formData.get("member1"),
		formData.get("member2"),
		formData.get("member3"),
	];

	try {
		const response = await axios.post(
			"https://heliverse-backend-ch44.onrender.com/api/teams/",
			{
				name: name,
				memberUserIds: memberUserIds,
			}
		);

		revalidatePath("/team");
	} catch (error: any) {
		return error;
	}
};
