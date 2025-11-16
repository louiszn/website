<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";

	import Icon from "@iconify/svelte";

	import avatar from "$lib/assets/avatar.jpeg";

	const links = [
		{
			icon: "material-symbols:mail",
			url: "mailto:louiszn269@gmail.com"
		},
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
			url: "https://x.com/loux2206",
		},
	];

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

	onMount(() => {
		setTimeout(() => {
			updateArrow();
			window.addEventListener("scroll", updateArrow);
		}, 100);

		return () => {
			window.removeEventListener("scroll", updateArrow);
		};
	});
</script>

<div class="relative flex flex-col w-full h-screen items-center justify-center gap-5">
	<div class="flex items-center gap-20">
		<div class="relative w-60 h-60 rounded-full overflow-hidden p-1 gradient-border">
			<img src={avatar} alt="" class="w-full h-full z-10 rounded-full" />
		</div>

		<div class="flex flex-col gap-5">
			<div class="flex flex-col gap-2">
				<span class="flex flex-col text-6xl font-bold"
					>Hewwo, I'm <span class="text-accent">Louis Johnson</span></span
				>
				<span class="text-3xl font-bold text-accent2">A cute oreo kitty</span>
			</div>

			<!-- Links -->
			<div class="flex items-center gap-5 h-10">
				{#each links as link (link.url)}
					<a
						href={link.url}
						class="hover:text-accent transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon={link.icon} class="w-8 h-8" />
					</a>
				{/each}
			</div>
		</div>
	</div>

	{#if showArrow}
		<button
			class="absolute bottom-5 p-2 rounded-full outline outline-muted text-muted animate-bounce"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
			onclick={scrollToContent}
		>
			<Icon icon="fe:arrow-down" class="h-5 w-5" />
		</button>
	{/if}
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

<div id="about-me" class="flex w-full h-screen items-center justify-center">
	<span class="text-5xl font-bold">About me</span>
</div>

