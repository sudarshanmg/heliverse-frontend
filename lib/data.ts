"use server";
import { unstable_noStore as noStore } from "next/cache";
import axios from "axios";

export async function fetchFilteredUsers(
	name: string | undefined,
	gender: string | undefined,
	available: boolean | undefined,
	domains: string | undefined,
	currentPage: number | undefined
) {
	noStore();

	const queryParams = {
		name: name,
		page: currentPage,
		gender: gender,
		available: available,
		domains: domains,
	};

	try {
		const response = await axios.get(
			"https://heliverse-backend-ch44.onrender.com/api/users/",
			{
				params: queryParams,
			}
		);
		if (response) {
			return response.data;
		}
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch data.");
	}
}

export async function fetchTeams(name: string | undefined) {
	noStore();

	const queryParams = {
		name: name,
	};

	try {
		const response = await axios.get(
			"https://heliverse-backend-ch44.onrender.com/api/teams/",
			{
				params: queryParams,
			}
		);
		if (response) {
			return response.data;
		}
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch data.");
	}
}
