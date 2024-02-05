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
	import { onMount } from 'svelte';
	import { PUBLIC_HYDRANT_BASEURL } from '$env/static/public';

	let subject: Subject | undefined;

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

	let hydrantUrl = PUBLIC_HYDRANT_BASEURL;

	onMount(() => {
		const callback = `${window.location}hydrantCallback`;
		hydrantUrl = `${PUBLIC_HYDRANT_BASEURL}/#/export?callback=${encodeURIComponent(callback)}`;
	})
</script>

<svelte:head>
	<title>Class group chats</title>
</svelte:head>

<div class="container px-4 mx-auto max-w-screen-lg py-4 space-x-4">
	<div class="grid md:grid-flow-col grid-flow-row items-center space-x-8 space-y-2 pb-4">
		<div>
			<KerbInput {username} />
		</div>
		<div>
			<a class="btn variant-filled" href={hydrantUrl}>
				<span>Import class list from</span>
				<span style="margin-left: 5px;"><HydrantLogo /></span>
			</a>
		</div>
		<div>
			<button class="btn variant-filled" on:click={importFromWebathena}>Import from Canvas via Webathena</button>
		</div>
	</div>

	{#if $username}
		<SearchBox on:subjectSelected={(event) => (subject = event.detail)} />

		{#if subject}
			<SubjectDetails {subject} />
		{/if}
	{/if}
</div>
