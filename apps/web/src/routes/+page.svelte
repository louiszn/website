<script lang="ts">
	import Icon from "@iconify/svelte";

	interface Link {
		icon: string;
		href: string;
		label: string;
	}

	const links: Link[] = [
		{
			href: "mailto:louiszn269@gmail.com",
			icon: "mdi:mail",
			label: "Email",
		},
		{
			href: "https://github.com/louiszn",
			icon: "mdi:github",
			label: "GitHub",
		},
		{
			href: "https://youtube.com/@louiszn",
			icon: "mdi:youtube",
			label: "YouTube",
		},
		{
			href: "https://x.com/loux2206",
			icon: "codicon:twitter",
			label: "XTwitter",
		},
	];

	let showContact = $state(false);
</script>

<div class="flex flex-col w-full h-screen items-center justify-center gap-10 p-4 text-center">
	<h1 class="text-5xl md:text-6xl max-w-3xl leading-tight font-medium">
		Building <span class="text-accent">Open Solutions</span> for Real-World Problems
	</h1>

	<div class="flex flex-col items-center gap-4">
		<div
			class="flex bg-card outline outline-card-outline items-center rounded-full overflow-hidden transition-all"
		>
			<button
				class="bg-card px-4 py-2 hover:bg-black/5 active:bg-black/10 transition-colors"
				onclick={() => (showContact = !showContact)}
				aria-expanded={showContact}
			>
				Contact me
			</button>

			<div 
                class="grid transition-[grid-template-columns] duration-300 ease-out"
                class:grid-cols-[1fr]={showContact}
                class:grid-cols-[0fr]={!showContact}
            >
                <div class="overflow-hidden flex items-center">
                    <div 
                        class="flex gap-3 px-3 border-l border-card-outline delay-75"
                        class:opacity-100={showContact}
                        class:opacity-0={!showContact}
                    >
                        {#each links as link (link.href)}
                            <a
                                href={link.href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={link.label}
                                class="hover:text-accent transition-colors flex items-center"
                            >
                                <Icon icon={link.icon} class="w-6 h-6" />
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
		</div>
	</div>
</div>
