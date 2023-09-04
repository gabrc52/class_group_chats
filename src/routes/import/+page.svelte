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
		<h1 class="title">Importing from 
			{#if importingFrom.toLowerCase() == 'hydrant'}
				<HydrantLogo/>
			{:else}
				{importingFrom}
			{/if}
		</h1>
        <p class="subtitle">Join some of them or join all of them, your pick.</p>
        <!-- TODO: make UI actually functional, using similar endpoints to SubjectDetails.svelte -->

		<!-- TODO: use a smaller component - we are reusing the existing one for demo purposes
			
			it would be good to turn SubjectDetails into SubjectContainer and just pass the necessary
			stuff as props. or some other way to keep it DRY
		-->
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

<style>
	@font-face { font-family: Epilogue-Bold; src: url('/Epilogue-Bold.ttf'); } 

	#hydr {
		font-family: Epilogue-Bold;
		color: #1499e1;
		text-transform: lowercase;
	}

	#ant {
		font-family: Epilogue-Bold;
		color: #e43a45;
	}
</style>