<script lang="ts">
	import { page } from '$app/stores';
	import HydrantLogo from '$lib/components/HydrantLogo.svelte';
	import SubjectDetails from '$lib/components/SubjectDetails.svelte';

	let importingFrom: string;
	let classNumbers: string[] = [];

	$: {
		importingFrom = $page.url.searchParams.get('via') ?? 'unknown source';
		classNumbers = $page.url.searchParams.getAll('class');
	}
</script>

<!-- TODO: maybe center?-->
<div class="section content">
	<div class="container is-max-desktop">
		<h1 class="title is-1">Importing from 
			{#if importingFrom.toLowerCase() == 'hydrant'}
				<HydrantLogo/>
			{:else}
				{importingFrom}
			{/if}
		</h1>
        <p class="subtitle is-4">Join some of them or join all of them, your pick.</p>
	</div>
	{#each classNumbers as classNumber}
		<SubjectDetails subject={{
			number: classNumber,
			// leave these unfilled for now, not that we're actually using it like this
			name: '',
			level: '',
			oldNumber: undefined,
		}}/>
	{/each}
</div>
