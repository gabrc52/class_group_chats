<script lang="ts">
	import { page } from '$app/stores';
	import HydrantLogo from '$lib/components/HydrantLogo.svelte';
	import SubjectDetails from '$lib/components/SubjectDetails.svelte';
	import type { Subject } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const mxid: Readable<string> = getContext('mxid');

	let importingFrom: string;
	let classNumbers: string[] = [];
	let loading: boolean = false;

	$: {
		importingFrom = $page.url.searchParams.get('via') ?? 'unknown source';
		classNumbers = $page.url.searchParams.getAll('class');
	}

	// subjects to pass to children
	// TODO: ideally we wouldn't need to pass the other things but we are reusing the same component
	//		 so we should make a component specifically for this
	let subjects: Subject[];
	$: subjects = classNumbers.map((number) => ({
		number: number,
		name: '',
		level: '',
		oldNumber: undefined
	}));

	async function inviteAll(): Promise<void> {
		loading = true;
		for (const subject of subjects) {
			const response = await fetch(`/classes/api/chat/${subject.number}/member/${$mxid}`, {
				method: 'PUT'
			});
			// TODO: error checking again, but for now 403 is returned when you are already inside
			// which would cause unnecessary errors
		}
		loading = false;
	}
</script>

<!-- TODO: it would be nice to show one single loading indicator and wait for all children
	but i don't think there's currently a straightforward way to know whether a child is loading -->

<div class="section">
	<div class="container is-max-desktop">
		<div class="level">
			<div class="level-left">
				<div class="level-item">
					<div class="content">
						<h1 class="title is-1">
							Importing from
							{#if importingFrom.toLowerCase() == 'hydrant'}
								<HydrantLogo />
							{:else}
								{importingFrom}
							{/if}
						</h1>
						<p class="subtitle is-4" style="padding-top: 25px;">
							Join some of them or join all of them, your pick.
						</p>
					</div>
				</div>
			</div>
			<div class="level-right">
				<div class="level-item">
					<button class="button is-link is-rounded" on:click={inviteAll}>
						<span class="icon">
							<i class="fa-solid fa-user-plus" />
						</span>
						<span>Join all of them</span>
					</button>
				</div>
				<div class="level-item">
					<button
						class="button is-primary is-outlined is-rounded"
						on:click={() => (subjects = subjects)}
					>
						<span class="icon">
							<i class="fa-solid fa-arrow-rotate-right" />
						</span>
						<span>Refresh all</span>
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
{#if loading === true}
	<div class="container is-max-desktop">
		<progress class="progress is-link" max="100">30%</progress>
	</div>
{:else}
	{#each subjects as subject (subject.number)}
		<SubjectDetails {subject} isListItem={true} />
	{/each}
{/if}
