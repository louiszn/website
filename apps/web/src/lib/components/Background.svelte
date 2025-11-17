<script lang="ts">
	import { createParticle, drawParticle, type Particle } from "$lib/utils/backgroundParticle";
	import { onMount } from "svelte";

	// Cache element instead of getting them on draw
	let canvas: HTMLCanvasElement;
	let context: CanvasRenderingContext2D;
	let particles: Particle[] = [];

	let width = 0;
	let height = 0;

	let lastScroll = 0;
	let scrollDelta = 0;

	let animationStartTime = 0;

	function getParticleAmount() {
		const baseAmount = 200;
		const baseArea = 1920 * 1080;

		const width = window.innerWidth;
		const height = window.innerHeight;
		const area = width * height;

		let amount = Math.round((area / baseArea) * baseAmount);

		amount = Math.max(50, Math.min(amount, 300));

		return amount;
	}

	function initParticles() {
		const amount = getParticleAmount();

		if (particles.length <= amount) {
			particles.length = 0;
			particles = Array.from({ length: amount }, () => createParticle(width, height));
		}
	}

	function setupCanvas() {
		const { innerHeight, innerWidth } = window;

		const widthDiff = width ? Math.abs((innerWidth - width) / width) : 1;
		const heightDiff = height ? Math.abs((innerHeight - height) / height) : 1;

		// Prevent updating from mobile browsers' toolbar resizing
		if (widthDiff < 0.12 && heightDiff < 0.12) {
			return;
		}

		if (!context) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			context = canvas.getContext("2d")!;
		}

		width = canvas.width = innerWidth;
		height = canvas.height = innerHeight;

		animationStartTime = performance.now();
		initParticles();
	}

	function clearCanvas() {
		context.clearRect(0, 0, width, height);
	}

	function draw() {
		clearCanvas();

		const now = performance.now();

		for (let i = 0; i < particles.length; i++) {
			drawParticle(
				context,
				particles[i],
				i,
				getParticleAmount(),
				scrollDelta,
				width,
				height,
				animationStartTime,
				now,
			);
		}

		scrollDelta *= 0.9; // damping
		requestAnimationFrame(draw);
	}

	function handleScroll() {
		const { scrollY } = window;
		scrollDelta = scrollY - lastScroll;
		lastScroll = scrollY;
	}

	onMount(() => {
		setupCanvas();
		handleScroll();

		window.addEventListener("scroll", handleScroll);
		window.addEventListener("resize", setupCanvas);

		requestAnimationFrame(draw);

		return () => {
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", setupCanvas);
		};
	});
</script>

<canvas
	bind:this={canvas}
	class="fixed left-0 top-0 -z-1 w-full h-screen min-h-screen pointer-events-none"
></canvas>
