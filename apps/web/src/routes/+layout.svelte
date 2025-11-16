<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";
	import Background from "$lib/components/Background.svelte";

	let { children } = $props();
</script>

<svelte:head>
	<title>Louiszn</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Background />

<Navbar />

{@render children()}
