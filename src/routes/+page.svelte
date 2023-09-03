<script lang="ts">
    import Header from "$lib/components/Header.svelte";
    import SearchBox from "$lib/components/SearchBox.svelte";
    import type { Subject, SubjectDetails } from "$lib/subject";

    let subject: Subject | undefined;
    $: console.log(subject);

    async function getSubjectDetails(number: string): Promise<SubjectDetails> {
        const response = await fetch(`/classes/api/subject/${number}`);
        const json = await response.json();
        return json;
    }
</script>

<Header/>
<SearchBox on:subjectSelected={(event) => subject = event.detail}/>

{#if subject}
    <!-- TODO: promise.all? -->
    {#await getSubjectDetails(subject.number)}
        <div class="section">
            <div class="container is-max-desktop">
                <h1 class="title">{subject.number}: {subject.name}</h1>
                <progress class="progress is-info" max="100">30%</progress>
            </div>
        </div>
    {:then canonicalSubject} 
    <div class="section">
        <div class="container is-max-desktop">
            <h1 class="title">{canonicalSubject.canonicalNumber}: {canonicalSubject.title}</h1>
            <p>{canonicalSubject.description}</p>
        </div>
    </div>
    {/await}
{/if}