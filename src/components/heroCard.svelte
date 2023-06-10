<script>
	export let hero;
</script>

<div class="card" style="width: 18rem;">
	<img src={hero.images.md} class="card-img-top" alt="..." />
	<div class="card-body">
		<h5 class="card-title">{hero.name}</h5>
		{#if hero.biography.alignment === 'good'}
			<p class="card-text text-success">Good</p>
		{:else if hero.biography.alignment === 'bad'}
			<p class="card-text text-danger">Evil</p>
		{:else}
			<p class="card-text text-warning">Neutral</p>
		{/if}
		<a class="btn btn-primary details-button" href={`/hero?id=${hero.id}`}>Ver Detalles</a>
	</div>
</div>

<style>
	.details-button {
		background-color: rgba(33, 37, 41, 1) !important;
		border-color: rgba(33, 37, 41, 1) !important;
	}
</style>
