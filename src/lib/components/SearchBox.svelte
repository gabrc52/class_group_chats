<script lang="ts">
	import type { Subject } from '$lib/subject';
	import { onMount } from 'svelte';
	import { fade, slide } from 'svelte/transition';

	enum Level {
		undergrad,
		grad,
		both
	}

	let query: string = '';
	let subjects: Subject[] = [];
	let results: Subject[] = [];
	let level: Level = Level.undergrad;

	onMount(async () => {
		subjects = await getAllSubjects();
	});

	async function getAllSubjects() {
		const response = await fetch('/classes/api/subject/all');
		const json: Subject[] = await response.json();
		return json;
	}

	// TODO: deal with subjects with multiple numbers
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
				subject.number.includes(query)
					|| (subject.oldNumber && subject.oldNumber.includes(query))
					|| subject.name.toLowerCase().includes(query.toLowerCase()
			)
		);
	}

	let searchResults = [];

	$: search(subjects, query, level).then((r) => (results = r));
</script>

<!-- TODO implement some sort of search-->
<div class="section">
	{#if subjects.length > 0}
		<!-- TODO shrink it more-->
		<div class="container is-max-desktop" transition:fade={{ duration: 200 }}>
			<div class="panel">
				<p class="panel-heading">Class search</p>
				<div class="panel-block">
					<p class="control has-icons-left">
						<!-- TODO turn this into a form too -->
						<input class="input" type="text" placeholder="Search" bind:value={query} />
						<span class="icon is-left">
							<i class="fas fa-search" aria-hidden="true" />
						</span>
					</p>
				</div>
				<p class="panel-tabs">
					<a href="#" class:is-active={level === Level.undergrad} on:click={() => (level = Level.undergrad)}>Undergrad</a>
					<a href="#" class:is-active={level === Level.grad} on:click={() => (level = Level.grad)}>Grad</a>
					<a href="#" class:is-active={level === Level.both} on:click={() => (level = Level.both)}>Both</a>
				</p>

                {#each results as result (result.number)}
                <a href="#" class="panel-block">
					<span class="panel-icon">
						<i class="fas fa-book" aria-hidden="true" />
					</span>
					<p><strong>{result.number}</strong>: {result.name}</p>
				</a>
                {/each}
			</div>
		</div>
	{/if}
</div>
