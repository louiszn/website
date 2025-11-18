<script lang="ts">
	import { onNavigate } from "$app/navigation";
	
	import Navbar from "$lib/components/Navbar.svelte";
	
	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Background from "$lib/components/Background.svelte";

	let { children } = $props();


	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		window.scrollTo({ top: 0 });

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Louiszn</title>
	<link rel="icon" href={favicon} />
</svelte:head>
<Background />

<Navbar />

{@render children()}
