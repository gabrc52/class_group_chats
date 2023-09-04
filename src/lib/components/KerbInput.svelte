<script lang="ts">
	import { PUBLIC_MATRIX_HOMESERVER } from "$env/static/public";
	import { getContext } from "svelte";
	import type { Readable, Writable } from "svelte/store";

    export let username: Writable<string>;
    const mxid: Readable<string> = getContext('mxid');
</script>

<div class="section" style="padding-bottom: 0;">
	<div class="container is-max-desktop">
        <label for="kerb" class="label">Enter your kerb</label>
		<div class="field is-horizontal has-addons">
			<p class="control">
				<span class="button is-static">@</span>
			</p>
            <p class="control">
				<input class="input" type="text" id="kerb" name="kerb" placeholder="jflorey" bind:value={$username} />
			</p>
			<p class="control">
				<span class="button is-static">:{PUBLIC_MATRIX_HOMESERVER}</span>
			</p>
		</div>
        {#if $username}
            <p class="help">The full thing ({$mxid}) is your global Matrix username.</p>
        {/if}
	</div>
</div>