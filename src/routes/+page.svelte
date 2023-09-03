<script lang="ts">
	import { PUBLIC_MATRIX_HOMESERVER } from '$env/static/public';
	import Header from '$lib/components/Header.svelte';
	import SearchBox from '$lib/components/SearchBox.svelte';
	import SubjectDetails from '$lib/components/SubjectDetails.svelte';
	import type { Subject } from '$lib/subject';
    import { setContext } from 'svelte';
	import { persisted } from 'svelte-local-storage-store';
    import { derived, readonly } from 'svelte/store';

    // TODO: use some actual authentication mechanism
    const username = persisted<string>('username', '');
    setContext('username', readonly(username));
    setContext('mxid', derived(username, (username) => `@${username}:${PUBLIC_MATRIX_HOMESERVER}`));

	let subject: Subject | undefined;
	$: console.log(subject);
</script>

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
            <p class="help">The full thing (@{$username}:{PUBLIC_MATRIX_HOMESERVER}) is your global Matrix username.</p>
        {/if}
	</div>
    
</div>

<SearchBox on:subjectSelected={(event) => (subject = event.detail)} />

{#if subject}
	<SubjectDetails {subject} />
{/if}
