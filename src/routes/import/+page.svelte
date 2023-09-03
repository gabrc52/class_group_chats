<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { page } from '$app/stores';

	let importingFrom: string;
	let classNumbers: string[] = [];

	$: {
		importingFrom = $page.url.searchParams.get('via') ?? 'unknown source';
		classNumbers = $page.url.searchParams.getAll('class');
	}
</script>

<Header />

<!-- TODO: maybe center?-->
<div class="section content">
	<div class="container is-max-desktop">
		<h1 class="title">Importing from {importingFrom}</h1>
		<p class="subtitle">TODO(rgabriel): Implement</p>
        <p class="subtitle">Join some of them or join all of them, your pick.</p>
        <!-- TODO: make UI actually functional, using similar endpoints to SubjectDetails.svelte -->
        <ul>
            {#each classNumbers as classNumber}
                <li>{classNumber}</li>
            {/each}
        </ul>
	</div>
</div>
