<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Footer from "$lib/components/Footer.svelte";

	import { onMount } from "svelte";

	let { children } = $props();

	onMount(() => {
		window.scrollTo({ top: 0, behavior: "instant" });
	});
</script>

<svelte:head>
	<title>Louiszn</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

{@render children()}

<Footer />
