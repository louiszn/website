<script lang="ts">
	import Navbar from "$lib/components/Navbar.svelte";

	import "../app.css";
	import favicon from "$lib/assets/favicon.svg";

	let { children } = $props();
</script>

<svelte:head>
	<title>Louiszn</title>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

{@render children()}
