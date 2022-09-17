<script lang="ts">
	import '../app.css'
</script>

<svelte:head>
	<title>Svelte Movies</title>
</svelte:head>

<header class="flex py-5 px-16 items-center gap-16 border-b-2 border-gray-800">
	<h1 class="font-bold flex gap-1 items-center text-xl">
		<img class="w-10 h-10" src="/logo.svg" alt="Svelte logo" />
		<div>
			svelte <span class="text-orange-500">movies</span>
		</div>
	</h1>

	<nav class="capitalize flex gap-4">
		<a href="/movies">movies</a>
		<a href="/shows">TV shows</a>
		<a href="/people">people</a>
	</nav>
</header>

<main class="p-16">
	<slot />
</main>
