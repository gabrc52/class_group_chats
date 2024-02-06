<script lang="ts">
	import { onMount } from "svelte";
    import { LOCAL_STORAGE_LOGIN_TOKEN_KEY } from "$lib/constants";
	import { goto } from "$app/navigation";

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
