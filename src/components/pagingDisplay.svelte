<div class="paging-container">
    <img class={ showBackArrow? "paging-img active": "paging-img" } src={arrowLeft} alt="Paging Image" on:click={previousPage}>
    <div class="page">{ page }</div>
    <img class={ showForwardArrow? "paging-img active": "paging-img" } src={arrowRight} alt="Paging Image" on:click={nextPage}>
</div>

<script>

import { createEventDispatcher } from 'svelte';
import arrowLeft from '../assets/arrowLeft.png';
import arrowRight from '../assets/arrowRight.png';

const dispatch = createEventDispatcher();

export let page;
export let maxPages;
$: showBackArrow = page > 1;
$: showForwardArrow = page < maxPages;

function previousPage() {
    if (page > 1) {
        dispatch('previousPage');
    }
}

function nextPage() {
    if (page < maxPages) {
        dispatch('nextPage');
    }
}

</script>

<style> 

    .paging-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        width: 100%;
        margin-top: 1rem;
        margin-bottom: 1rem;
    }
    
    .paging-img {
        width: 2.5rem;
        height: 2.5rem;
        margin: 0.5rem;
        cursor: pointer;
        background-color: rgb(77, 87, 96);
        border-radius: 10px;
        padding: 0.5rem;
    }
    
    .paging-img.active {
        background-color: rgba(33,37,41,1)
    }
    
    .page {
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0.5rem;
    }
    
    
    </style>