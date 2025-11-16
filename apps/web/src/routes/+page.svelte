<script lang="ts">
	import { onMount } from "svelte";
	import { fade, fly } from "svelte/transition";

	import Icon from "@iconify/svelte";

	import avatar from "$lib/assets/avatar.jpeg";

	const links = [
		{
			icon: "mdi:github",
			url: "https://github.com/louiszn",
		},
		{
			icon: "mdi:youtube",
			url: "https://youtube.com/@louiszn",
		},
		{
			icon: "codicon:twitter",
			url: "https://x.com/loux2206"
		}
	];

	let mounted = false;
	let showLinks = false;
	let showArrow = false;

	function updateArrow() {
		showArrow = window.scrollY < window.innerHeight * 0.1;
	}

	function scrollToContent() {
		const aboutMe = document.getElementById("about-me");

		if (!aboutMe) {
			return;
		}

		aboutMe.scrollIntoView({ behavior: "smooth" });
	}

	function disableScroll(duration = 1000) {
		const body = document.body;
		const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

		const originalOverflow = body.style.overflow;
		const originalPadding = body.style.paddingRight;

		body.style.overflow = "hidden";
		body.style.paddingRight = `${scrollbarWidth}px`;

		setTimeout(() => {
			body.style.overflow = originalOverflow;
			body.style.paddingRight = originalPadding;
		}, duration);
	}

	onMount(() => {
		mounted = true;

		setTimeout(() => {
			showLinks = true;
		}, 1500);

		setTimeout(() => {
			updateArrow();
			window.addEventListener("scroll", updateArrow);
		}, 2000);

		disableScroll(2000);

		return () => {
			window.removeEventListener("scroll", updateArrow);
		};
	});
</script>

<div class="relative flex flex-col w-full h-screen items-center justify-center gap-5">
	{#if mounted}
		<div class="flex items-center gap-10" in:fly={{ duration: 400, delay: 100, y: 50, opacity: 0 }}>
			<div class="relative w-60 h-60 rounded-full overflow-hidden p-1 gradient-border">
				<img src={avatar} alt="" class="w-full h-full z-10 rounded-full" />
			</div>

			<div class="flex flex-col gap-5">
				<div class="flex flex-col gap-2">
					<span class="text-5xl font-bold" in:fly={{ duration: 500, delay: 400, x: -100 }}
						>Hewwo, I'm <span class="text-accent">Louis</span></span
					>
					<span
						class="text-3xl font-bold text-accent2"
						in:fly={{ duration: 600, delay: 900, x: -100 }}>A cute oreo kitty</span
					>
				</div>

				<!-- Links -->
				<div class="flex items-center gap-5 h-10">
					{#each links as link, index (link.url)}
						{#if showLinks}
							<a
								href={link.url}
								class="hover:text-accent transition-colors"
								target="_blank"
								rel="noopener noreferrer"
								in:fly={{ duration: 400, delay: index * 200, x: -150, opacity: 0 }}
							>
								<Icon icon={link.icon} class="w-10 h-10" />
							</a>
						{/if}
					{/each}
				</div>
			</div>
		</div>

		{#if showArrow}
			<button
				class="absolute bottom-5 p-2 rounded-full outline outline-muted text-muted animate-bounce"
				in:fade={{ duration: 400 }}
				out:fade={{ duration: 400 }}
				onclick={scrollToContent}
			>
				<Icon icon="fe:arrow-down" class="h-5 w-5" />
			</button>
		{/if}
	{/if}
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<style>
	.gradient-border {
		position: relative;
		padding: 4px;
		border-radius: 9999px;
		background: linear-gradient(
			270deg,
			var(--accent),
			var(--accent2),
			var(--accent),
			var(--accent2),
			var(--accent)
		);
		background-size: 800% 800%;
		animation: gradient-fluid 20s ease-in-out infinite;
	}

	@keyframes gradient-fluid {
		0% {
			background-position: 0% 50%;
		}
		25% {
			background-position: 50% 70%;
		}
		50% {
			background-position: 100% 50%;
		}
		75% {
			background-position: 50% 30%;
		}
		100% {
			background-position: 0% 50%;
		}
	}
</style>
