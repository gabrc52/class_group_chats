<script lang="ts">
	import { onMount } from "svelte";
    import { LOCAL_STORAGE_LOGIN_TOKEN_KEY } from "$lib/constants";
	import { goto } from "$app/navigation";
    import { ProgressRadial } from '@skeletonlabs/skeleton';

    let message = '';

    onMount(() => {
        const query = new URLSearchParams(window.location.search);
        // make sure the login token is set
        const matrixLoginToken = query.get("loginToken");
        if (!matrixLoginToken) {
            message = "Touchstone callback did not receive loginToken";
            return;
        }
        // put it in local storage and redirect back
        localStorage.setItem(LOCAL_STORAGE_LOGIN_TOKEN_KEY, matrixLoginToken);
        goto("/classes");
    });
</script>

{#if message}
    <p>{message}</p>
{:else}
    <!-- A loading indicator might be nice but this is supposed to run instantly -->
    <!-- If so TODO center -->
    <!-- <ProgressRadial/> -->
{/if}