import { Octokit } from "octokit";

import { print, type DocumentNode } from "graphql";
import { TTLCache } from "@isaacs/ttlcache";

import { GITHUB_TOKEN } from "$env/static/private";

import GetUser from "$lib/queries/GetUser.gql";
import GetUserRepositories from "$lib/queries/GetUserRepositories.gql";

import type { UserQueryResult } from "$types/queries/user";
import type {
	RepositoriesConnection,
	Repository,
	UserRepositoriesQueryResult,
} from "$types/queries/repository";

const cachedResponses = new TTLCache({
	ttl: 5 * 60_000, // 5 mins
	max: 50,
});

const octokit = new Octokit({
	auth: GITHUB_TOKEN,
});

function getGraphqlRequestKey(query: string, parameters: object) {
	return `${query}:${JSON.stringify(parameters)}`;
}

export async function makeRequest<T>(
	key: string,
	fn: () => Awaitable<T>,
	cache = true,
): Promise<T> {
	const cached = cachedResponses.get(key);

	if (cache && cached) {
		return cached as T;
	}

	const result = await fn();

	if (cache) {
		cachedResponses.set(key, result);
	}

	return result;
}

export async function makeGraphqlRequest<T>(
	query: DocumentNode,
	parameters: Record<string, unknown> = {},
	cache = true,
): Promise<T> {
	const rawQuery = print(query);

	return await makeRequest<T>(
		getGraphqlRequestKey(rawQuery, parameters),
		() => {
			return octokit.graphql<T>(rawQuery, parameters);
		},
		cache,
	);
}

export async function getUser(username: string) {
	const now = new Date();
	const to = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate())); // Ensure it uses the first value of the day
	const from = new Date(to.getTime() - 53 * 7 * 24 * 60 * 60 * 1000); // Get exactly 53 weeks like how Github did

	const result = await makeGraphqlRequest<UserQueryResult>(GetUser, {
		username,
		to,
		from,
	});

	return result.user;
}

export async function getUserRepositories(username: string) {
	return makeRequest(`repos:${username}`, async () => {
		let hasNextPage = true;
		let endCursor: string | null = null;

		const repos: Repository[] = [];

		while (hasNextPage) {
			const result = await makeGraphqlRequest<UserRepositoriesQueryResult>(
				GetUserRepositories,
				{
					username,
					after: endCursor,
				},
				false, // The result will be cached in repos
			);

			if (!result.user) {
				break;
			}

			const { repositories } = result.user;
			const { page, edges } = repositories as RepositoriesConnection; // TS somehow complains about result being any when I use page.endCursor

			repos.push(...edges.map((x) => x.node));

			hasNextPage = page.hasNextPage;
			endCursor = page.endCursor;
		}

		return repos;
	});
}
