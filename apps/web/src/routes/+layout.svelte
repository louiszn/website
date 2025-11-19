<script lang="ts">
	import { onNavigate } from "$app/navigation";

	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Background from "$lib/components/Background.svelte";
	import Footer from "$lib/components/Footer.svelte";
	import { onMount } from "svelte";

	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) {
			return;
		}

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});

	onMount(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	});
</script>

<svelte:head>
	<title>Louiszn</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<Background />

{@render children()}

<Footer />
