<script lang="ts">
	import { onMount } from "svelte";
    import { LOCAL_STORAGE_SUBJECT_LIST_KEY } from "$lib/constants";
	import { goto } from "$app/navigation";

    onMount(() => {
        const query = new URLSearchParams(window.location.search);
        const classes = query.getAll("class");

        // put it in local storage and redirect back
        localStorage.setItem(LOCAL_STORAGE_SUBJECT_LIST_KEY, JSON.stringify(classes));
        goto("/classes");
    });
</script>
