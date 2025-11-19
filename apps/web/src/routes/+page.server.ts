import { getUser, getUserRepositories } from "$lib/utils/github";

const USERNAME = "louiszn";

export async function load() {
	const [ghUser, repositories] = await Promise.all([
		getUser(USERNAME),
		getUserRepositories(USERNAME),
	]);

	return { ghUser, repositories };
}
