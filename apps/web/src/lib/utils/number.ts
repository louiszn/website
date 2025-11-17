export function random(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export function wrap(value: number, min: number, max: number) {
	const range = max - min;

	let result = (value - min) % range;

	if (result < 0) {
		result += range;
	}

	return result + min;
}
