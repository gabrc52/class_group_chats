<script lang="ts">
	import type { Subject } from '$lib/types';
	import { getContext, onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { persisted } from 'svelte-local-storage-store';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';

	const dispatch = createEventDispatcher();

	enum Level {
		undergrad,
		grad,
		both
	}

	let query: string = '';
	let subjects: Subject[] = [];
	let results: Subject[] = [];
	// we namespace the local storage keys because we are on the same local storage
	// as Element
	let level = persisted('edu.mit.sipb.subjects.level', Level.undergrad);

	let username: Readable<string> = getContext('username');

	onMount(async () => {
		subjects = await getAllSubjects();
	});

	async function getAllSubjects() {
		const response = await fetch('/classes/api/subject/all');
		const json: Subject[] = await response.json();
		return json;
	}

	async function search(subjects: Subject[], query: string, level: Level): Promise<Subject[]> {
		query = query.trim();
		// Don't display anything if there is no query yet
		if (query === '') {
			return [];
		}
		// TODO: ideally, we should sort by relevance, for example prefer startsWith over includes
		// this is more of a stretch goal but makes the user interface nicer
		// It seems like Hydrant has some fuzzier matching (for example "6042" works too)
		return subjects.filter(
			(subject) =>
				((subject.level === 'G' && level !== Level.undergrad) ||
					(subject.level === 'U' && level !== Level.grad)) &&
				(subject.number.toLowerCase().includes(query.toLowerCase()) ||
					(subject.oldNumber && subject.oldNumber.includes(query)) ||
					subject.name.toLowerCase().includes(query.toLowerCase()))
		);
	}

	$: search(subjects, query, $level).then((r) => (results = r));

	function selectSubject(subject: Subject) {
		dispatch('subjectSelected', subject);
		query = '';
	}
</script>

<div class="section">
	{#if subjects.length > 0}
		<div class="card p-4" transition:fade={{ duration: 200 }}>
			<p class="pb-4">Class search</p>
			<!-- TODO: re-add search icon -->
			<input
				class="input"
				type="text"
				id="searchbox"
				placeholder="Search a class by number or name"
				bind:value={query}
			/>
			<RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
				<RadioItem bind:group={$level} name="level" value={Level.undergrad}>Undergrad</RadioItem>
				<RadioItem bind:group={$level} name="level" value={Level.grad}>Grad</RadioItem>
				<RadioItem bind:group={$level} name="level" value={Level.both}>Both</RadioItem>
			</RadioGroup>

			{#each results as result (result.number)}
				<a class="panel-block" on:click={() => selectSubject(result)}>
					<span class="panel-icon">
						<i class="fas fa-book" aria-hidden="true" />
					</span>
					<p><strong>{result.number}</strong>: {result.name}</p>
				</a>
			{/each}
		</div>
	{:else}
		<progress class="progress is-primary" max="100">30%</progress>
	{/if}
</div>
