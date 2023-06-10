<script>
	import { loading, favorites } from '@/store';
	import { onMount } from 'svelte';
	import ApiRequester from '@/integrations/heroApi';
	import HeroCard from '@/components/heroCard.svelte';

	let heroes = [];

	async function loadFavorites() {
		$loading = true;
		const api = new ApiRequester();
		const data = await api.getHeroes();
		heroes = data.filter((hero) => $favorites.includes(hero.id));
		$loading = false;
	}

	onMount(async () => {
		await loadFavorites();
	});

	$: loadFavorites(), $favorites;
</script>

<div class="container">
	<div class="heroes-container">
		{#each heroes as hero}
			<HeroCard {hero} />
		{/each}
	</div>
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
