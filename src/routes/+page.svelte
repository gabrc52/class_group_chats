<script lang="ts">
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SubjectDetails from '$lib/components/SubjectDetails.svelte';
	import type { Subject } from '$lib/types';

	let subject: Subject | undefined;
	$: console.log(subject);
</script>

<SearchBox on:subjectSelected={(event) => (subject = event.detail)} />

{#if subject}
	<SubjectDetails {subject} />
{/if}
