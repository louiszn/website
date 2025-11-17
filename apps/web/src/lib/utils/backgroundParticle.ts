import { randomItem } from "./array";
import { random, wrap } from "./number";

export const PARTICLE_COLORS = [
	"#ffffff",
	"#ffd1dc",
	"#c2f0fc",
	"#d6caff",
	"#fff7c2",
	"#a8ffb0",
	"#ffc2a8",
];
export const PARTICLE_FADE_IN_DURATION = 800;
export const PARTICLE_WRAP_MARGIN = 10;

export interface Particle {
	x: number;
	y: number;
	size: number;
	velocity: number;
	opacity: number;
	blinkSpeed: number;
	blinkPhase: number;
	color: string;
}

export function createParticle(width: number, height: number): Particle {
	const size = random(2, 8);
	const opacity = random(0.3, 0.9);

	return {
		x: random(0, width),
		y: random(0, height),
		size,
		opacity,
		color: randomColor(),
		velocity: getParticleVelocity(size),
		blinkSpeed: random(0.0005, 0.001),
		blinkPhase: random(0, Math.PI * 2),
	};
}

export function randomColor() {
	return randomItem(PARTICLE_COLORS);
}

export function getParticleVelocity(size: number) {
	return (10 - size) / 5;
}

export function drawParticle(
	context: CanvasRenderingContext2D,
	particle: Particle,
	index: number,
	amount: number,
	scrollDelta: number,
	width: number,
	height: number,
	startTime: number,
	now: number,
) {
	const { velocity, size, color, blinkSpeed, blinkPhase } = particle;

	const fadeInProgress = getFadeInProgress(index, amount, startTime, now);
	const blinkState = getBlinkState(blinkSpeed, blinkPhase, now);

	const drawOpacity = particle.opacity * blinkState * fadeInProgress;

	// Handle particle movement
	if (scrollDelta !== 0) {
		const move = velocity * scrollDelta * 0.1;
		particle.x -= move;
		particle.y -= move;
	}

	// Wrap the particle to screen to create infinity effect
	particle.x = wrap(particle.x, -PARTICLE_WRAP_MARGIN, width + PARTICLE_WRAP_MARGIN);
	particle.y = wrap(particle.y, -PARTICLE_WRAP_MARGIN, height + PARTICLE_WRAP_MARGIN);

	// Draw circle particle
	context.globalAlpha = drawOpacity;
	context.fillStyle = color;
	context.beginPath();
	context.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
	context.fill();
}

export function getFadeInProgress(index: number, amount: number, startTime: number, now: number): number {
	const appearanceThreshold = (index / amount) * PARTICLE_FADE_IN_DURATION;
	const elapsed = now - startTime;

	if (elapsed < appearanceThreshold) {
		return 0;
	}

	const progress = Math.min((elapsed - appearanceThreshold) / (PARTICLE_FADE_IN_DURATION * 0.5), 1);

	return 1 - Math.pow(1 - progress, 2);
}

export function getBlinkState(speed: number, phase: number, now: number) {
	return Math.sin(now * speed + phase) * 0.5 + 0.5;
}
