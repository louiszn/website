import { getUserContributionCalendar } from "$lib/utils/github";

export async function load() {
	const contributionCalendar = await getUserContributionCalendar("louiszn");
	return { contributionCalendar };
}
