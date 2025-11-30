<script lang="ts">
	import { page } from '$app/state';
    import { fly } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

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

<div class="grid grid-cols-1 grid-rows-1 w-full min-h-screen overflow-x-hidden">
	{#key page.url.pathname}
		<div
			class="row-start-1 col-start-1 w-full"
			in:fly={{ x: 50, duration: 300, delay: 200, easing: cubicOut }}
			out:fly={{ x: -50, duration: 200, easing: cubicOut }}
		>
			{@render children()}
		</div>
	{/key}
</div>

<Footer />
