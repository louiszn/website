<script lang="ts">
	import { onMount } from "svelte";
	import { fade } from "svelte/transition";
	import Icon from "@iconify/svelte";
	import type { LayoutProps } from "./$types";

	import avatar from "$lib/assets/avatar.jpeg";

	import type { ContributionCalendar } from "$types/queries/userContributons";

	interface ExtendedLayoutProps {
		data: {
			contributionCalendar: ContributionCalendar;
		};
	}

	let { data }: LayoutProps & ExtendedLayoutProps = $props();

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

	let contribGrid: HTMLDivElement;

	let showArrow = $state(false);

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

	const colors = ["#2a2a2a", "#264653", "#2a9d8f", "#8feaff", "#A6D1E6"];

	function getColor(count: number) {
		if (count === 0) {
			return colors[0];
		}
		if (count <= 2) {
			return colors[1];
		}
		if (count <= 4) {
			return colors[2];
		}
		if (count <= 6) {
			return colors[3];
		}
		return colors[4];
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

<div class="relative flex flex-col w-full h-screen items-center justify-center gap-10 lg:gap-25">
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

	<div class="lg:p-0 p-2 w-full lg:w-fit">
		<div
			class="flex flex-col w-full p-5 gap-3 bg-card/50 backdrop-blur-sm outline-1 outline-card-outline rounded-2xl"
		>
			<div class="flex w-full justify-between font-mono">
				<span class="font-bold lg:text-lg text-sm">@louiszn's contributions</span>
				<span class="font-bold lg:text-lg text-sm"
					>{data.contributionCalendar.totalContributions} total</span
				>
			</div>

			<div class="flex gap-1">
				<div class="flex flex-col font-mono text-xs lg:text-sm gap-1">
					{#each weekdays as day, i (i)}
						<div class="flex w-3 h-3 lg:w-4 lg:h-4 items-center">{i % 2 !== 0 ? day : ""}</div>
					{/each}
				</div>

				<div
					class="grid grid-rows-7 grid-flow-col gap-1 w-full overflow-x-auto lg:overflow-hidden"
					bind:this={contribGrid}
				>
					{#each data.contributionCalendar.weeks as week}
						{#each week.contributionDays as day}
							<div
								title={`${day.date}: ${day.contributionCount} contributions`}
								class="w-3 lg:w-4 h-3 lg:h-4 rounded-xs lg:rounded-sm cursor-pointer"
								style="background-color: {getColor(day.contributionCount)}"
							></div>
						{/each}
					{/each}
				</div>
			</div>
		</div>
	</div>

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

<div class="w-full h-screen"></div>
