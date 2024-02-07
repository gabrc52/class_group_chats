<!--
    for the new version,
    we are not showing the description, just the subject, with a button to delete
-->

<script lang="ts">
	import { onMount } from 'svelte';
	import type { SubjectDetailsOracle } from '$lib/types';
	import type { MouseEventHandler } from 'svelte/elements';
	import { slide } from 'svelte/transition';

	export let subject: string;
	let subjectDetails: SubjectDetailsOracle | undefined;
	export let onDelete: MouseEventHandler<HTMLButtonElement>;

	onMount(async () => {
		const response = await fetch(`/classes/api/subjectWarehouse/${subject}`);
		const json = await response.json();
		subject = json.masterNumber;
		subjectDetails = json;
	});
</script>

<div transition:slide class="hover:bg-secondary-500 hover:bg-opacity-35">
	<!-- so the material icon is too small - i tried copying just the svg and it's too big -->
	<button on:click={onDelete} type="button" class="btn-icon btn-icon-sm variant-filled"
		><i class="fa-solid fa-trash"></i></button
	>
	<span class="flex-auto">
		<dt>
			<span class="font-bold">{subject}</span>
			<!-- TODO: it would be good to use the longer name -->
			{#if subjectDetails}
				<span class="opacity-70">{subjectDetails?.title}</span>
			{/if}
		</dt>
		{#if subjectDetails && subjectDetails.otherNumbers.length > 0}
			<dd class="pl-0">
				<span class="opacity-50 text-sm"
					>Also known as: {subjectDetails.otherNumbers
						.filter((s) => s !== subject)
						.join(', ')}</span
				>
			</dd>
		{/if}
	</span>
</div>
