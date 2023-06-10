{#if hero}

<div class="main-container">
    <img src={hero.images.md} alt="" class="img-container">
    <div class="biography">
        <div class="stats-container">
            <div class="row">
                <div class="col">
                    <h2>{hero.name}</h2>
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    {#if hero.biography.alignment === "good"}
                        <h3 class="card-text text-success">Good</h3>
                    {:else if hero.biography.alignment === "bad"}
                        <h3 class="card-text text-danger">Evil</h3>
                    {:else}
                        <h3 class="card-text text-warning">Neutral</h3>
                    {/if}
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">Intelligence</div>
                        <div>{hero.powerstats.intelligence}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">Strength</div>
                        <div>{hero.powerstats.strength}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">Speed</div>
                        <div>{hero.powerstats.speed}</div>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">Durability</div>
                        <div>{hero.powerstats.durability}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">Power</div>
                        <div>{hero.powerstats.power}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">Combat</div>
                        <div>{hero.powerstats.combat}</div>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">gender</div>
                        <div>{hero.appearance.gender}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">height</div>
                        <div>{hero.appearance.height[1]}</div>
                    </div>
                </div>
                <div class="col">
                    <div class="stat">
                        <div class="stat-title">weight</div>
                        <div>{hero.appearance.weight[1]}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="biography-detail">
            <div class="detail-title">
                Full Name:
            </div>
            <div class="detail-value">
                {hero.biography.fullName}
            </div>
        </div>
        <div class="biography-detail">
            <div class="detail-title">
                Publisher:
            </div>
            <div class="detail-value">
                {hero.biography.publisher}
            </div>
        </div>
        <div class="button-container">
            <div class="btn btn-primary">Agregar a favoritos</div>
        </div>
    </div>
</div>

{/if}


<script>
    import { onMount } from "svelte";
    import { page } from '$app/stores';
    import { loading } from "@/store";
    import ApiRequester from "@/integrations/heroApi";

    $: id = $page.url.searchParams.get("id")
    let hero = null;

    onMount(async () => {
        $loading = true;
        const api = new ApiRequester();
        const data = await api.getHero(id);
        hero = data;
        $loading = false;
    });

</script>

<style>

.main-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    width: 100%;
    height: 100%;
}

.img-container {
    border-radius: 10px;
}

.biography {
    display: flex;
    flex-direction: column;
    width: 30%;
    height: 100%;
}

.biography-detail {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 0.5rem;
    padding: 0.5rem;
}

.detail-title {
    font-size: 1rem;
    font-weight: bold;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 0.5rem;
}

.stats-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background-color: rgba(33,37,41,1);
    color: white;
    padding: 0.5rem;
}

.row {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}

.col {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
}

.stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 0.5rem;
}

.stat-title {
    font-size: 1.5rem;
    font-size: 1rem;
    font-weight: bold;
}

@media screen and (max-width: 991px) {
    .main-container {
        flex-direction: column;
    }

    .biography {
        width: 90%;
        justify-content: center;
        align-items: center;
    }

    .biography-detail {
        width: auto;
    }

    .stats-container {
        width: 80%;
    }
}

</style>