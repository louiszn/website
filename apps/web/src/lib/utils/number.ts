export function random(min: number, max: number) {
	return Math.random() * (max - min) + min;
}

export function wrap(value: number, min: number, max: number) {
	if (value > max) {
		return min;
	}

	if (value < min) {
		return max;
	}
	
	return value;
}
