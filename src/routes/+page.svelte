<script lang="ts">
	import HydrantLogo from '$lib/components/HydrantLogo.svelte';
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

<div class="section" style="padding-bottom: 0;">
	<div class="container is-max-desktop">
		<div class="columns is-centered is-vcentered">
			<div class="column is-half">
				<KerbInput {username}/>
			</div>
			<div class="column">
				<button class="button">
					<span>Import class list from</span>
					<span style="margin-left: 5px;"><HydrantLogo/></span>
				</button>
			</div>
			<div class="column">
				<button class="button">Import from Webathena</button>
			</div>
		</div>
	</div>
</div>

<SearchBox on:subjectSelected={(event) => (subject = event.detail)} />

{#if subject}
	<SubjectDetails {subject} />
{/if}
