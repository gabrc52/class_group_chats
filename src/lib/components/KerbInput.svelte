<script lang="ts">
	import { PUBLIC_MATRIX_HOMESERVER } from '$env/static/public';
	import type { UsernameExistsResult } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Readable, Writable } from 'svelte/store';

	export let username: Writable<string>;
	const mxid: Readable<string> = getContext('mxid');

	let usernameExists: boolean = true;
	let lookedUpUsername: string;

	async function exists(username: string): Promise<boolean> {
		username = username.trim().toLowerCase();
		const kerb = username.trim().toLowerCase();
		const response = await fetch(`/classes/api/kerb/${kerb}`);
		const result: UsernameExistsResult = await response.json();
		return result.exists;
	}
</script>

<label for="kerb" class="label">Enter your kerb</label>
<div class="field is-horizontal has-addons">
	<p class="control">
		<span class="button is-static">@</span>
	</p>
	<p class="control">
		<input
			class="input"
			class:is-danger={!usernameExists}
			type="text"
			id="kerb"
			name="kerb"
			placeholder="jflorey"
            on:change={async (e) => {
                const kerb = e.currentTarget.value;
                const result = await exists(kerb);
                lookedUpUsername = kerb;
                usernameExists = result;
            }}
			bind:value={$username}
		/>
	</p>
	<p class="control">
		<span class="button is-static">:{PUBLIC_MATRIX_HOMESERVER}</span>
	</p>
</div>
{#if $username}
	{#if usernameExists}
		<p class="help">The full thing ({$mxid}) is your global Matrix username.</p>
	{:else}
		<p class="help is-danger">Kerb {lookedUpUsername} does not exist</p>
	{/if}
{/if}
