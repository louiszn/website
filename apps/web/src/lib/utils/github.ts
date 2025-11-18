import { Octokit } from "octokit";
import { print } from "graphql";
import { GITHUB_TOKEN } from "$env/static/private";

import GetContribtutions from "$lib/queries/getContributions.gql";
import type { ContributionCalendar, UserContributions } from "$types/queries/userContributons";

export const DEFAULT_CACHE_TTL = 5 * 60 * 1000;

let cachedCalendar: ContributionCalendar | null = null;
let lastFetch = 0;

export async function getUserContributionCalendar(username: string): Promise<ContributionCalendar> {
	const now = Date.now();

	if (!cachedCalendar || now - lastFetch > DEFAULT_CACHE_TTL) {
		lastFetch = now;

		const octokit = new Octokit({
			auth: GITHUB_TOKEN,
		});

		const query = print(GetContribtutions);

		const from = new Date(now - 366 * 24 * 60 * 60 * 1_000); // 366 days ago

		const result = await octokit.graphql<UserContributions>(query, {
			username,
			from,
			to: new Date(now),
		});

		cachedCalendar = result.user.contributionsCollection.contributionCalendar;
	}

	return cachedCalendar;
}
