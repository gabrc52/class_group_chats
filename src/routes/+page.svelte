<script lang="ts">
	import KerbInput from '$lib/components/KerbInput.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SubjectDetails from '$lib/components/SubjectDetails.svelte';
	import type { Subject } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let subject: Subject | undefined;

	const username: Writable<string> = getContext('username');

	$: console.log(subject);
</script>

<KerbInput {username}/>

<SearchBox on:subjectSelected={(event) => (subject = event.detail)} />

{#if subject}
	<SubjectDetails {subject} />
{/if}
