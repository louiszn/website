<script lang="ts">
	import { random, wrap } from "$lib/utils/number";
	import { onMount } from "svelte";

	const PARTICLE_AMOUNT = 200;
	const PARTICLE_COLORS = [
		"#ffffff",
		"#ffd1dc",
		"#c2f0fc",
		"#d6caff",
		"#fff7c2",
		"#a8ffb0",
		"#ffc2a8",
	] as const;
	const FADE_IN_DURATION = 500;

	interface Particle {
		x: number;
		y: number;
		size: number;
		velocity: number;
		opacity: number;
		blinkSpeed: number;
		blinkPhase: number;
		color: string;
	}

	let canvas: HTMLCanvasElement;
	let particles: Particle[] = [];

	let lastScroll = 0;
	let scrollDelta = 0;

	let animationStartTime = 0;

	function createParticle(): Particle {
		const { innerWidth, innerHeight } = window;

		const size = random(2, 8);
		const opacity = random(0.3, 0.9);

		return {
			x: random(0, innerWidth),
			y: random(0, innerHeight),
			size,
			opacity,
			color: randomColor(),
			velocity: getParticleVelocity(size),
			blinkSpeed: random(0.0005, 0.001),
			blinkPhase: random(0, Math.PI * 2),
		};
	}

	function randomColor() {
		return PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
	}

	function getParticleVelocity(size: number) {
		return (10 - size) / 5;
	}

	function draw() {
		const context = canvas.getContext("2d");
		if (!context) {
			return;
		}

		// Clean old particles
		context.clearRect(0, 0, canvas.width, canvas.height);

		for (const [i, particle] of particles.entries()) {
			drawParticle(context, particle, i);
		}

		// Reset scroll delta to stop movement
		scrollDelta = 0;

		// Start the loop
		requestAnimationFrame(draw);
	}

	function drawParticle(context: CanvasRenderingContext2D, particle: Particle, index: number) {
		const { velocity, size, color, blinkSpeed, blinkPhase } = particle;
		const { width, height } = canvas;

		const fadeInProgress = getFadeInProgress(index);
		const blinkState = getBlinkState(blinkSpeed, blinkPhase);

		const drawOpacity = particle.opacity * blinkState * fadeInProgress;

		// Handle particle movement
		if (scrollDelta !== 0) {
			const move = velocity * scrollDelta * 0.1;
			particle.x -= move;
			particle.y -= move;
		}

		// Wrap the particle to screen to create infinity effect
		const margin = 10;
		particle.x = wrap(particle.x, -margin, width + margin);
		particle.y = wrap(particle.y, -margin, height + margin);

		// Draw circle particle
		context.globalAlpha = drawOpacity;
		context.fillStyle = color;
		context.beginPath();
		context.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
		context.fill();
	}

	function getFadeInProgress(index: number): number {
		const appearanceThreshold = (index / PARTICLE_AMOUNT) * FADE_IN_DURATION;
		const elapsed = Date.now() - animationStartTime;

		if (elapsed < appearanceThreshold) {
			return 0;
		}

		const progress = Math.min((elapsed - appearanceThreshold) / (FADE_IN_DURATION * 0.5), 1);
		return 1 - Math.pow(1 - progress, 2);
	}

	function getBlinkState(speed: number, phase: number) {
		return Math.sin(Date.now() * speed + phase) * 0.5 + 0.5;
	}

	onMount(() => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;

		if (particles.length <= PARTICLE_AMOUNT) {
			particles = Array.from({ length: PARTICLE_AMOUNT }, createParticle);
		}

		window.addEventListener("scroll", () => {
			const { scrollY } = window;

			scrollDelta = scrollY - lastScroll;
			lastScroll = scrollY;
		});

		animationStartTime = Date.now();
		requestAnimationFrame(draw);
	});
</script>

<canvas bind:this={canvas} class="fixed left-0 top-0 w-full h-screen pointer-events-none"></canvas>
