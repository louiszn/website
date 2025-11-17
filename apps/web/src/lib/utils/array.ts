export function randomItem<T>(arr: T[]): T {
	return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}

	return arr;
}

export function sample<T>(array: T[], count: number): T[] {
	const result = shuffle([...array]);
	return result.slice(0, count);
}
