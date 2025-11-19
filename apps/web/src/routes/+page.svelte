<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import Icon from "@iconify/svelte";
	import type { LayoutProps } from "./$types";

	import avatar from "$lib/assets/avatar.jpeg";

	import type { User } from "$types/queries/user";
	import { ContributionLevel } from "$lib/enums/github";
	import type { Repository } from "$types/queries/repository";

	interface ExtendedLayoutProps {
		data: {
			ghUser: User | null;
			repositories: Repository[];
		};
	}

	const { data }: LayoutProps & ExtendedLayoutProps = $props();

	const { repositories, ghUser } = data;

	const totalStars = repositories.reduce((prev, x) => prev + x.stargazerCount, 0);

	const links = [
		{
			icon: "material-symbols:mail",
			url: "mailto:louiszn269@gmail.com",
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

	let contribGrid: HTMLDivElement = $state(undefined) as never;

	let showArrow = $state(false);

	function updateArrow() {
		showArrow = window.scrollY < window.innerHeight * 0.1;
	}

	function scrollToContent() {
		const aboutMe = document.getElementById("about-me");
		const navbar = document.getElementById("navbar");

		if (!aboutMe) {
			return;
		}

		const navbarHeight = navbar ? navbar.offsetHeight + 20 : 0;
		const elementTop = aboutMe.getBoundingClientRect().top + window.scrollY;

		window.scrollTo({
			top: elementTop - navbarHeight,
			behavior: "smooth",
		});
	}

	const colors = ["#2a2a2a", "#264653", "#2a9d8f", "#8feaff", "#A6D1E6"];

	function getColor(level: ContributionLevel) {
		switch (level) {
			case ContributionLevel.None:
				return colors[0];
			case ContributionLevel.FirstQuartile:
				return colors[1];
			case ContributionLevel.SecondQuartile:
				return colors[2];
			case ContributionLevel.ThirdQuartile:
				return colors[3];
			case ContributionLevel.FourthQuartile:
				return colors[4];
		}
	}

	onMount(() => {
		contribGrid.scrollLeft = contribGrid.scrollWidth;

		setTimeout(() => {
			updateArrow();
			window.addEventListener("scroll", updateArrow);
		}, 100);

		return () => {
			window.removeEventListener("scroll", updateArrow);
		};
	});

	const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
</script>

<div class="relative flex flex-col w-full h-screen items-center justify-center gap-5 lg:gap-25">
	<div class="flex items-center gap-6 lg:gap-20">
		<img src={avatar} alt="" class="lg:w-60 lg:h-60 w-30 h-30 z-10 rounded-full" />

		<div class="flex flex-col gap-2 lg:gap-5">
			<div class="flex flex-col gap-1 lg:gap-2">
				<span class="flex flex-col text-2xl lg:text-6xl font-bold"
					>Hewwo, I'm <span class="text-accent">Louis Johnson</span></span
				>
				<span class="text-lg lg:text-3xl font-bold text-accent2">A cute oreo kitty</span>
			</div>

			<!-- Links -->
			<div class="flex items-center gap-3 lg:gap-5 h-10">
				{#each links as link (link.url)}
					<a
						href={link.url}
						class="hover:text-accent transition-colors"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Icon icon={link.icon} class="w-6 h-6 lg:w-8 lg:h-8" />
					</a>
				{/each}
			</div>
		</div>
	</div>

	{#if ghUser}
		{@const { contributions, followers } = ghUser}

		<div class="lg:p-0 p-5 w-full lg:w-fit font-mono">
			<div
				class="flex flex-col w-full p-4 gap-3 bg-card/40 backdrop-blur-sm outline-1 outline-card-outline rounded-2xl"
			>
				<div class="flex w-full justify-between">
					<span class="font-bold lg:text-lg text-sm">@louiszn's contributions</span>
					<span class="font-bold lg:text-lg text-sm">{contributions.calendar.total} total</span>
				</div>

				<div class="flex gap-1">
					<div class="flex flex-col font-mono text-xs lg:text-sm gap-1">
						{#each weekdays as day, i (i)}
							<div class="flex w-3 h-3 lg:w-4 lg:h-4 items-center">{i % 2 !== 0 ? day : ""}</div>
						{/each}
					</div>

					<div
						class="grid grid-flow-col grid-rows-7 gap-1 w-full overflow-x-auto lg:overflow-hidden"
						bind:this={contribGrid}
					>
						{#each contributions.calendar.weeks as week}
							{#each week.days as day}
								<div
									title={`${day.date}: ${day.count} contributions`}
									class="w-3 lg:w-4 h-3 lg:h-4 rounded-xs lg:rounded-sm cursor-pointer"
									style="background-color: {getColor(day.level)}"
								></div>
							{/each}
						{/each}
					</div>
				</div>

				<div class="flex gap-4">
					<div class="text-center">
						<span class="font-bold lg:text-lg">{repositories.length}</span>
						<span class="text-xs">Repos</span>
					</div>
					<div class="text-center">
						<span class="font-bold lg:text-lg">{totalStars}</span>
						<span class="text-xs">Stars</span>
					</div>
					<div class="text-center">
						<span class="font-bold lg:text-lg">{followers.total}</span>
						<span class="text-xs">Followers</span>
					</div>
				</div>
			</div>
		</div>
	{/if}

	{#if showArrow}
		<button
			class="absolute bottom-25 lg:bottom-5 p-2 rounded-full outline outline-muted text-muted animate-bounce"
			in:fade={{ duration: 100 }}
			out:fade={{ duration: 100 }}
			onclick={scrollToContent}
		>
			<Icon icon="fe:arrow-down" class="h-5 w-5" />
		</button>
	{/if}
</div>

<div class="flex w-full h-screen justify-center mt-5" id="about-me">
	<span class="text-xl md:text-4xl font-bold">About Me</span>
</div>
