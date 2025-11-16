<script lang="ts">
	import { random, wrap } from "$lib/utils/number";
	import { onMount } from "svelte";

	const PARTICLE_AMOUNT = 120;
	const PARTICLE_COLORS = [
		"#ffffff",
		"#ffd1dc",
		"#c2f0fc",
		"#d6caff",
		"#fff7c2",
		"#a8ffb0",
		"#ffc2a8",
	] as const;

	interface Particle {
		x: number;
		y: number;
		size: number;
		velocity: number;
		opacity: number;
		blinkSpeed: number;
		blinkPhase: number;
		color: string;
		currentOpacity: number;
	}

	let canvas: HTMLCanvasElement;
	let particles: Particle[] = [];

	let lastScroll = 0;
	let scrollDelta = 0;

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
			currentOpacity: 0,
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

		for (const particle of particles) {
			drawParticle(context, particle);
		}

		// Reset scroll delta to stop movement
		scrollDelta = 0;

		// Start the loop
		requestAnimationFrame(draw);
	}

	function drawParticle(context: CanvasRenderingContext2D, particle: Particle) {
		const { velocity, opacity, size, color } = particle;
		const { innerHeight, innerWidth } = window;

		// Fade effect
		const fadeSpeed = velocity * 0.05;
		particle.currentOpacity = Math.min(particle.currentOpacity + fadeSpeed, opacity);

		// Blink effect
		const blink = Math.sin(Date.now() * particle.blinkSpeed + particle.blinkPhase) * 0.5 + 0.5;
		const drawOpacity = particle.currentOpacity * blink;

		// Calculate next position based on the scroll delta
		if (scrollDelta !== 0) {
			const move = velocity * scrollDelta * 0.1;
			particle.x -= move;
			particle.y -= move;
		}

		const margin = 10;

		// Wrap the particle to screen to create infinity effect
		particle.x = wrap(particle.x, -margin, innerWidth + margin);
		particle.y = wrap(particle.y, -margin, innerHeight + margin);

		// Draw circle particle
		context.globalAlpha = drawOpacity;
		context.fillStyle = color;
		context.beginPath();
		context.arc(particle.x, particle.y, size / 2, 0, Math.PI * 2);
		context.fill();
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

		requestAnimationFrame(draw);
	});
</script>

<canvas bind:this={canvas} class="fixed left-0 top-0 w-full h-screen pointer-events-none"></canvas>
