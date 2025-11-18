<script lang="ts">
	import { page } from "$app/state";

	interface Page {
		href: string;
		label: string;
	}

	const pages: Page[] = [
		{
			href: "/",
			label: "Home",
		},
		{
			href: "/blog",
			label: "Blog",
		},
	];
</script>

<nav
	id="navbar"
	class="flex bg-card/80 outline-card-outline outline-1 backdrop-blur-2xl fixed top-0 w-full py-3 px-20 justify-between items-center z-99"
	style="view-transition-name: navbar;"
>
	<a href="/" class="font-bold text-xl">Louiszn</a>

	<div class="flex gap-10 items-center">
		{#each pages as p}
			{@const isActive =
				page.url.pathname === "/"
					? page.url.pathname === p.href
					: p.href.startsWith(page.url.pathname)}

			<a
				href={p.href}
				class={`flex hover:text-accent transition-colors items-center gap-2 ${isActive && "text-accent"}`}
				aria-current={isActive ? "page" : undefined}
			>
				{p.label}
			</a>
		{/each}
	</div>
</nav>

<style>
	a[aria-current="page"]::before {
		view-transition-name: active-page;
	}
</style>
