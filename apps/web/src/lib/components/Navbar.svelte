<script lang="ts">
	import { page } from "$app/state";

	interface Page {
		href: string;
		label: string;
		icon: string;
	}

	const pages: Page[] = [
		{ href: "/", label: "Home", icon: "heroicons:home-16-solid" },
		{ href: "/blog", label: "Blog", icon: "ri:blogger-fill" },
	];

	function isActive(href: string) {
		if (href === "/") return page.url.pathname === "/";
		return page.url.pathname.startsWith(href);
	}

	let scrollY = $state(0);
	let isTop = $derived(scrollY < 30);
</script>

<svelte:window bind:scrollY />

<div class="fixed top-0 left-0 w-full flex justify-center z-99 md:pt-4 pointer-events-none">
	<nav
		class="pointer-events-auto transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]
		flex justify-between items-center px-6 backdrop-blur-xl border
        {isTop
			? 'w-full rounded-none border-transparent bg-transparent py-4'
			: 'w-[90%] md:w-[600px] rounded-full border-card-outline bg-card/80 py-3 shadow-2xl'}"
	>
		<span class="font-bold text-lg">Louiszn</span>

		<div class="flex gap-1 items-center">
			{#each pages as p}
				{@const activated = isActive(p.href)}

				<a
					href={p.href}
					class="px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300
                    {activated
						? 'bg-white text-black shadow-sm'
						: 'text-gray-400 hover:text-white hover:bg-white/10'}"
				>
					{p.label}
				</a>
			{/each}
		</div>
	</nav>
</div>
