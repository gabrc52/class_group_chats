<script lang="ts">
	import { goto } from '$app/navigation';
	import HydrantLogo from '$lib/components/HydrantLogo.svelte';
	import KerbInput from '$lib/components/KerbInput.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SubjectDetails from '$lib/components/SubjectDetails.svelte';
	import { getClassListFromMoira } from '$lib/moira';
	import type { Subject } from '$lib/types';
	import { encodeTicket, getUsername, loginWebathena } from '$lib/webathena';
	import { getContext } from 'svelte';
	import type { Writable } from 'svelte/store';

	let subject: Subject | undefined;
	let showHydrantInstructions: boolean = false;

	const username: Writable<string> = getContext('username');

	$: console.log(subject);

	async function importFromWebathena(): Promise<void> {
		const webathena = await loginWebathena();
		const token = encodeTicket(webathena);
		const classes = await getClassListFromMoira(token);
		$username = getUsername(webathena);
		console.log(classes);
		goto(`/classes/import?via=Webathena${classes.map((cls) => `&class=${cls}`).join('')}`);
	}
</script>

<svelte:head>
	<title>Class group chats</title>
</svelte:head>

<div class="container mx-auto max-w-screen-lg py-4 space-x-4">
	<div class="flex flex-row ">
		<div class="column is-half">
			<KerbInput {username} />
		</div>
		<div class="column">
			<button class="btn" on:click={() => (showHydrantInstructions = true)}>
				<span>Import class list from</span>
				<span style="margin-left: 5px;"><HydrantLogo /></span>
			</button>
		</div>
		<div class="column">
			<button class="btn" on:click={importFromWebathena}>Import from Webathena</button>
		</div>
	</div>

	{#if $username}
		{#if showHydrantInstructions}
			<div class="section">
				<div class="container is-max-desktop">
					<a href="https://hydrant.mit.edu" target="_self">
						<div class="notification is-warning">
							<button
								class="delete"
								on:click|preventDefault={() => (showHydrantInstructions = false)}
							/>
							<!-- TODO would require another PR to Hydrant but pass a flag meaning (redirect me now) -->
							To import your class list from <HydrantLogo />, you must go to <HydrantLogo /><span
								class="icon"><i class="fa-solid fa-arrow-up-right-from-square" /></span
							>
							and once you have made your class selections, click on the button which says
							<button class="button is-light"
								><span class="icon"
									><i class="fa-regular fa-message" style="transform: scaleX(-1);" /></span
								><span>Join group chats on Matrix</span><span class="icon"
									><i class="fa-solid fa-arrow-up-right-from-square" /></span
								></button
							>.
						</div>
					</a>
				</div>
			</div>
		{/if}

		<SearchBox on:subjectSelected={(event) => (subject = event.detail)} />

		{#if subject}
			<SubjectDetails {subject} />
		{/if}
	{/if}
</div>
