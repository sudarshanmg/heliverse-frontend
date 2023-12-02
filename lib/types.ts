export type User = {
	_id: string;
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	gender: string;
	domain: string;
	available: string;
	avatar: string;
};

export type Team = {
	_id: string;
	name: string;
	members: User[];
};
