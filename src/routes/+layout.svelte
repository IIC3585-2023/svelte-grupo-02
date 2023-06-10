<div id="app">
    <Navbar/>
    <div class="content">
        {#if $loading}
            <div class="spinner-border text-primary loading" role="status" style="width: 5rem; height: 5rem;">
            <span class="visually-hidden">Loading...</span>
            </div>
        {/if}
        <div class={$loading ? 'hidden' : ''}>
            <slot/>
        </div>
    </div>
    <Footer/>
</div>


<script>
    import { onMount } from "svelte";
    import { onAuthStateChanged } from "firebase/auth";
    import { doc, onSnapshot } from "firebase/firestore";
    import { db, auth } from "../integrations/firebase";
    import { user, loading, favorites } from "../store";
    import Navbar from "../components/navbar.svelte";
    import Footer from "../components/footer.svelte";

    onMount(() => {
        onAuthStateChanged(auth, (loggedUser) => {
        $loading = true;
        if (loggedUser) {
            $user = loggedUser;
            const userRef = doc(db, 'users', loggedUser.uid);
            onSnapshot(userRef, async (docSnapshot) => {
            let docsData = docSnapshot.data();
            if (!docsData) {
                docsData = {favorites: []}
            }
            if (!docsData.favorites) {
                docsData.favorites = [];
            }
            $favorites = docsData.favorites;
            })
        } else {
            $user = null;
            $favorites = [];
        }
        $loading = false;
        });
    });
</script>



<style>
    #app {
      font-family: 'Poppins';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .content {
      padding: 1rem;
    }
    
    .loading {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -1rem;
      margin-left: -1rem;
      width: 50%;
    }
    </style>