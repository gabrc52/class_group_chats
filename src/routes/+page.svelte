<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchBox from "$lib/components/SearchBox.svelte";

    let subject: string | undefined;

    $: console.log(subject);
</script>

<Header/>
<SearchBox on:subjectChange={(event) => subject = event.detail}/>