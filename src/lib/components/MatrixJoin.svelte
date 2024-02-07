<script lang="ts">
	import { getContext, onMount } from "svelte";
	import type { Readable } from "svelte/store";
	import MatrixInstructions from "./MatrixInstructions.svelte";

    export let subjects: string[];

    let progress: number = 0;
    let loading: boolean = true;
    const mxid: Readable<string> = getContext('mxid');

    // Copied and pasted from import.old/+page.svelte
    // TODO: use Promise.all
    async function inviteAll(): Promise<void> {
		loading = true;
		progress = 0;
		for (const subject of subjects) {
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
		loading = false;
	}

    onMount(inviteAll);
</script>

{#if loading}
	You are currently being invited to all the chats. Please wait...

	<progress value={progress} max={subjects.length} />
{:else}
	<MatrixInstructions/>
{/if}