<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchBox from "$lib/components/SearchBox.svelte";
    import type { Subject } from "$lib/subject";

    let subject: Subject | undefined;

    $: console.log(subject);
</script>

<Header/>
<SearchBox on:subjectSelected={(event) => subject = event.detail}/>

{#if subject}
    <div class="section">
        <div class="container is-max-desktop">
            <h1 class="title">{subject.number}: {subject.name}</h1>
            <progress class="progress is-info" max="100">30%</progress>
        </div>
    </div>
{/if}