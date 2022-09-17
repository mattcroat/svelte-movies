<script lang="ts">
	import type { PageServerData } from './$types'

	export let data: PageServerData
	const { popularMovies } = data
</script>

<h1 class="uppercase font-bold text-lg text-orange-500 tracking-wide">
	popular movies
</h1>

<div class="flex flex-wrap gap-12 mt-8">
	{#each popularMovies as movie}
		<div>
			<a
				href={movie.slug}
				class="w-44 h-64 block bg-gray-800 rounded-lg overflow-hidden"
			>
				<img class="object-cover" src={movie.image} alt={movie.title} />
			</a>

			<div class="mt-4">{movie.title}</div>

			<div class="flex gap-1 mt-2 text-sm text-slate-400">
				<svg class="w-5 h-5 text-orange-500">
					<path
						d="M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218"
						fill="currentColor"
					/>
				</svg>
				<span>{movie.rating}</span>
				<span>{movie.year}</span>
			</div>
		</div>
	{/each}
</div>
