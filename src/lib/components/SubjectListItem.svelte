<!--
    for the new version,
    we are not showing the description, just the subject, with a button to delete
-->

<script lang="ts">
	import { onMount } from "svelte";
    import type { SubjectDetailsOracle } from "$lib/types";

	export let subject: string;
    let subjectDetails: SubjectDetailsOracle | undefined;
	export let onDelete: Function;

    onMount(async () => {
        const response = await fetch(`/classes/api/subjectWarehouse/${subject}`);
        const json = await response.json();
        subject = json.masterNumber;
        subjectDetails = json;
    });
</script>

<div class="hover:bg-primary-500 hover:bg-opacity-20">
	<!-- <span class="badge-icon p-4 variant-soft-secondary"><i class="fa-solid fa-book"></i></span> -->
	<span class="flex-auto space-x-2">
        <span class="font-bold">{subject}</span>
        {#if subjectDetails}
            <span class="opacity-70">{subjectDetails?.title}</span>
        {/if}
    </span>
</div>

<!-- <li>
	<span class="badge bg-primary-500">💀</span>
	<span class="flex-auto">
		<dt>{subject}</dt>
		<dd>Description</dd>
	</span>
</li> -->
