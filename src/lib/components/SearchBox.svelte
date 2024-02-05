<script lang="ts">
	import type { Subject } from '$lib/types';
	import { getContext, onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';
	import { persisted } from 'svelte-local-storage-store';
	import { createEventDispatcher } from 'svelte';
	import type { Readable } from 'svelte/store';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	import type { MouseEventHandler } from 'svelte/elements';
	// TODO: does CloesCircleOutline look better?
	import CloseIcon from 'svelte-material-icons/CloseCircle.svelte';
	import { LOCAL_STORAGE_SUBJECT_LEVEL_KEY } from '$lib/constants';

	export let onClose: MouseEventHandler<HTMLButtonElement> | undefined = undefined;

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
	let level = persisted(LOCAL_STORAGE_SUBJECT_LEVEL_KEY, Level.undergrad);

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

{#if subjects.length > 0}
	<div class="card p-4 mx-auto" transition:fade={{ duration: 200 }}>
		<div class="flex pb-4 items-center">
			{#if onClose}
				<!-- TODO(skeleton): make this button look better, in particular larger,
					or the size is fine but move it to the corner and reduce the padding
				 -->
				<button class="btn size-max" on:click={onClose}><CloseIcon /></button>
			{/if}
			<span>Class search</span>
			<RadioGroup
				active="variant-filled-primary"
				hover="hover:variant-soft-primary"
				class="ml-auto"
			>
				<RadioItem bind:group={$level} name="level" value={Level.undergrad}>Undergrad</RadioItem>
				<RadioItem bind:group={$level} name="level" value={Level.grad}>Grad</RadioItem>
				<RadioItem bind:group={$level} name="level" value={Level.both}>Both</RadioItem>
			</RadioGroup>
		</div>
		<!-- TODO(skeleton): re-add search icon -->

		<input
			class="input"
			type="text"
			id="searchbox"
			placeholder="Search a class by number or name"
			bind:value={query}
		/>

		<!-- TODO(skeleton): yes, the Autocomplete element exists in Skeleton.
			I am choosing to copy the styling to avoid having to refactor, and then this also
			means the <strong> inside would still work
		-->

		<div class="overflow-y-auto max-h-96 w-full mt-2 autocomplete">
			<nav class="autocomplete-nav">
				<ul class="autocomplete-list list-nav">
					{#each results as result (result.number)}
						<li class="autocomplete-item">
							<button
								class="autocomplete-button w-full"
								type="button"
								on:click={() => selectSubject(result)}
							>
								<strong>{result.number}</strong>: {result.name}
							</button>
						</li>
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{:else}
	<progress class="progress is-primary" max="100">30%</progress>
{/if}
