export interface UserRepositoriesQueryResult {
	user: User | null;
}

export interface User {
	repositories: RepositoriesConnection;
}

export interface RepositoriesConnection {
	total: number;
	page: PageInfo;
	edges: RepositoryEdge[];
}

export interface PageInfo {
	hasNextPage: boolean;
	endCursor: string | null;
}

export interface RepositoryEdge {
	node: Repository;
}

export interface Repository {
	name: string;
	stargazerCount: number;
}
