<script lang="ts">
	import { onNavigate } from "$app/navigation";

	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Background from "$lib/components/Background.svelte";
	import Footer from "$lib/components/Footer.svelte";

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				window.scrollTo({ top: 0 });
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<title>Louiszn</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<Background />
<div style="">
	{@render children()}
</div>

<Footer />
