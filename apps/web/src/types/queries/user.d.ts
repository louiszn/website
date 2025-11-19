import type { ContributionLevel } from "$lib/enums/github";

export interface UserQueryResult {
	user: User | null;
}

export interface User {
	contributions: UserContributions;
	followers: UserFollowers;
}

export interface UserFollowers {
	total: number;
}

export interface UserContributions {
	calendar: UserContributionCalendar;
}

export interface UserContributionCalendar {
	total: number;
	weeks: UserContributionCalendarWeek[];
}

export interface UserContributionCalendarWeek {
	days: UserContributionCalendarDay[];
}

export interface UserContributionCalendarDay {
	date: string;
	count: number;
	level: ContributionLevel;
}
