export interface ContributionDay {
	date: string;
	contributionCount: number;
	color: string;
}

export interface ContributionWeek {
	contributionDays: ContributionDay[];
}

export interface ContributionCalendar {
	totalContributions: number;
	weeks: ContributionWeek[];
}

export interface ContributionsCollection {
	contributionCalendar: ContributionCalendar;
}

export interface UserContributions {
	user: {
		contributionsCollection: ContributionsCollection;
	};
}
