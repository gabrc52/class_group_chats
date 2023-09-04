<script lang="ts">
	import 'bulma/css/bulma.css';
	import '@fortawesome/fontawesome-free/css/all.css';

	import { PUBLIC_MATRIX_HOMESERVER } from '$env/static/public';
	import Header from '$lib/components/Header.svelte';
	import { setContext } from 'svelte';
	import { persisted } from 'svelte-local-storage-store';
    import { derived, readonly } from 'svelte/store';

	// TODO: use some actual authentication mechanism
    const username = persisted<string>('username', '');
    setContext('username', readonly(username));
	const mxid = derived(username, (username) => `@${username}:${PUBLIC_MATRIX_HOMESERVER}`);
    setContext('mxid', mxid);
</script>

<!--
	if we end up wanting to customize the header we can use named slots
	but I think it's good to reuse the "authentication"
-->
<Header />

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

{#if $username}
	<slot />
{/if}

<footer class="footer">
	<div class="content has-text-centered">
		<p>
			Brought to you by <a href="https://sipb.mit.edu" target="_blank" rel="noopener">SIPB</a>.
            The source code is available on <a href="https://github.com/gabrc52/class_group_chats/">GitHub</a>.
		</p>
	</div>
</footer>
