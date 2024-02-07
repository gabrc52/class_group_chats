<!--
    Stepper that intentionally lets itself be controlled (receive state)
    instead of controlling you (managing its own state).
    
    The Skeleton stepper didn't let you start in an arbitrary step. This one just
    accepts a `step` integer prop, for example.
    
    Horrible code follows.

    I don't really like skeleton's stepper and importing the react MUI one would be
    probably a pain
    
    This looks horrendously cursed but comes from https://flowbite.com/docs/components/stepper/ 

    And yes, flowbite svelte does exist but it does not even seem to have a stepper
    The stepper doesn't even seem to be in the repo https://github.com/themesberg/flowbite

    tbh I don't even care about supporting a variable amount of steps
    that should be the library's job but I can't find a good one

    well--if it was react I could actually benefit from the functional syntax and pass an arbitrary
    amount of react components / but here i'll just use slots

    This is where Tailwind... we should probably just be using REGULAR css
-->

<script lang="ts">
	import LockIcon from '../icons/LockIcon.svelte';
	import Checkmark from '../icons/Checkmark.svelte';
	import type { Writable } from 'svelte/store';

	/**
	 * Number from 1 to 3
	 */
	// Writable so this component can modify it too
	export let step: Writable<number>;

	export let canGoNext: boolean;

	/**
	 * Popup that will be opened when pressing "Next"
	 */
	export let popupOnNext: string | undefined;
</script>

<ol class="flex items-center w-full text-sm font-medium text-center sm:text-base">
	<li
		class:text-gray-400={$step > 1}
		class:font-bold={$step === 1}
		class:text-primary-500={$step === 1}
		class="flex md:w-full items-center sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-500"
	>
		<span
			class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
		>
			{#if $step > 1}
				<Checkmark />
			{:else}
				<span class="me-2">1</span>
			{/if}
			<!-- TODO(skeleton): avoid using nbsp -->
			Identify&nbsp;yourself
			<!-- why should this even be necessary? the space looks :/ -->
			<!-- Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span> -->
		</span>
	</li>
	<li
		class:text-gray-400={$step > 2}
		class:font-bold={$step === 2}
		class:text-primary-500={$step === 2}
		class="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-500"
	>
		<span
			class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500"
		>
			{#if $step > 2}
				<Checkmark />
			{:else}
				<span class="me-2">2</span>
			{/if}
			Choose&nbsp;classes
		</span>
	</li>
	<li class:font-bold={$step === 3} class:text-primary-500={$step === 3} class="flex items-center">
		<span class="me-2">3</span>
		Enter&nbsp;the&nbsp;Matrix
	</li>
</ol>

<div class="py-8">
	<slot />
</div>

<!-- copied from skeleton-->
<div class="$step-navigation flex justify-between gap-4" style="">
	<button
		type="button"
		class="btn variant-ghost"
		disabled={$step === 1}
		on:click={() => {
			$step = $step - 1;
			if ($step < 1) $step = 1;
		}}
	>
		← Back
	</button>
	{#if $step < 3}
		<svelte:element this={popupOnNext ? "a" : "button"}
			role="button" tabindex="0"
			href={popupOnNext}
			target="element"
			type="button"
			class="btn variant-filled"
			disabled={!canGoNext}
			on:click={() => {
				$step = $step + 1;
				if ($step > 3) $step = 3;
			}}
		>
			{#if !canGoNext}
				<LockIcon />
			{/if}
			<span>Next →</span>
		</svelte:element>
	{/if}
</div>
