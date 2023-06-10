<script>
	import { loading } from '../store';
	import { onMount } from 'svelte';
	import ApiRequester from '../integrations/heroApi';
	import HeroCard from '../components/heroCard.svelte';
	import PagingDisplay from '../components/pagingDisplay.svelte';

	let heroes = [];
	let search = '';
	let page = 1;
	$: heroesDisplay = heroes.filter(
		(hero) =>
			hero.name.toLowerCase().includes(search.toLowerCase()) ||
			hero.biography.fullName.toLowerCase().includes(search.toLowerCase())
	);

	$: heroesPage = heroesDisplay.slice((page - 1) * 8, page * 8);
	$: maxPages = Math.ceil(heroesDisplay.length / 8);

	function resetPage() {
		page = 1;
	}

	$: resetPage(), search;

	onMount(async () => {
		$loading = true;
		const api = new ApiRequester();
		const data = await api.getHeroes();
		heroes = data;
		$loading = false;
	});
</script>

<div class="container">
	<input class="form-control" type="search" placeholder="Search" bind:value={search} />
	<PagingDisplay {page} {maxPages} on:previousPage={() => page--} on:nextPage={() => page++} />
	<div class="heroes-container">
		{#each heroesPage as hero}
			<HeroCard {hero} />
		{/each}
	</div>
	<PagingDisplay {page} {maxPages} on:previousPage={() => page--} on:nextPage={() => page++} />
</div>

<style>
	.heroes-container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 2rem;
	}

	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.2rem;
	}
</style>
