<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { Readable } from "svelte/store";
	import MatrixInstructions from "./MatrixInstructions.svelte";
	import { persisted } from "svelte-local-storage-store";
	import { LOCAL_STORAGE_HAS_OPENED_ELEMENT_KEY } from "$lib/constants";
	import ElementLogo from "./logos/ElementLogo.svelte";
	import { PUBLIC_ELEMENT_LINK } from "$env/static/public";

	let isMobile: Readable<boolean> = getContext('isMobile');

    export let subjects: string[];

    let progress: number = 0;
    let loading: boolean = true;
    const mxid: Readable<string> = getContext('mxid');
	const hasOpenedElement = persisted<boolean>(LOCAL_STORAGE_HAS_OPENED_ELEMENT_KEY, false);

	async function invite(subject: string): Promise<void> {
		const response = await fetch(`/classes/api/chat/${subject}/member/${$mxid}`, {
			method: 'PUT'
		});
		progress = progress + 1;
		if (!response.ok) {
			const text = await response.text();
			// swallow already in the room errors
			if (!text.includes('already in the room')) {
				alert(
					`Sorry, an error (${response.statusText}) occurred. Please try again. If you need help email matrix@mit.edu.\n${text}`
				);
			}
		}
	}

    async function inviteAll(): Promise<void> {
		loading = true;
		progress = 0;
		await Promise.all(subjects.map((subject) => invite(subject)));
		loading = false;
	}

    onMount(inviteAll);
</script>

<svelte:window on:beforeunload={(e) => {
	/// Discourage user from closing the tab if they haven't opened Element yet
	if (!$hasOpenedElement) {
		// https://developer.mozilla.org/en-US/docs/Web/API/Window/beforeunload_event
		e.preventDefault();
		e.returnValue = true;
	}
}} />

{#if loading}
<div class="mb-4">
		You are currently being invited to all the chats. Please wait...

		<progress value={progress} max={subjects.length-1} />
</div>
{/if}

{#if $hasOpenedElement || $isMobile}
<MatrixInstructions/>
{:else}
<div class="flex flex-col">
	<p class="pb-4">
		{#if !loading}
		You have been added now!
		{/if}
		To view your class group chats, you should open <a href={PUBLIC_ELEMENT_LINK} target="element" on:click={() => $hasOpenedElement = true}> <ElementLogo/> matrix.mit.edu</a>. Click the button below to do so:
	</p>
	<a type="button" class="btn variant-filled-success mx-auto" href={PUBLIC_ELEMENT_LINK} target="element" on:click={() => $hasOpenedElement = true}>
		<span><i class="fa-solid fa-arrow-up-right-from-square"></i></span>
		<span>Open matrix.mit.edu now</span>
	</a>
	<p class="text-sm opacity-70 mx-auto">
		(hold Ctrl or Cmd if you want to open it in the background)
	</p>
</div>
{/if}