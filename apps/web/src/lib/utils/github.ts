import { Octokit } from "octokit";
import { print } from "graphql";
import { GITHUB_TOKEN } from "$env/static/private";

import GetContribtutions from "$lib/queries/getContributions.gql";
import type { ContributionCalendar, UserContributions } from "$types/queries/userContributons";

export async function getUserContributionCalendar(username: string): Promise<ContributionCalendar> {
	const octokit = new Octokit({
		auth: GITHUB_TOKEN,
	});

	const query = print(GetContribtutions);

	const now = new Date();
	const from = new Date(now.getTime() - 366 * 24 * 60 * 60 * 1_000); // 366 days ago

	const result = await octokit.graphql<UserContributions>(query, {
		username,
		from,
		to: now,
	});

	return result.user.contributionsCollection.contributionCalendar;
}
