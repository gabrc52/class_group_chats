<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchBox from "$lib/components/SearchBox.svelte";
	import SubjectDetails from "$lib/components/SubjectDetails.svelte";
    import type { Subject } from "$lib/subject";

    let subject: Subject | undefined;
    $: console.log(subject);
</script>

<Header/>
<SearchBox on:subjectSelected={(event) => subject = event.detail}/>

{#if subject}
    <SubjectDetails {subject}/>
{/if}