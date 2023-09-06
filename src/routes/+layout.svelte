<script lang="ts">
	import 'bulma/css/bulma.css';
	import '@fortawesome/fontawesome-free/css/all.css';

	import { PUBLIC_MATRIX_HOMESERVER } from '$env/static/public';
	import Header from '$lib/components/Header.svelte';
	import { setContext } from 'svelte';
	import { persisted } from 'svelte-local-storage-store';
    import { derived, readonly } from 'svelte/store';
	import KerbInput from '$lib/components/KerbInput.svelte';

	// TODO: use some actual authentication mechanism
    const username = persisted<string>('edu.mit.sipb.subjects.username', '');
    setContext('username', username);
	const mxid = derived(username, (username) => `@${username.trim()}:${PUBLIC_MATRIX_HOMESERVER}`);
    setContext('mxid', mxid);
</script>

<!--
	if we end up wanting to customize the header we can use named slots
	but I think it's good to reuse the "authentication"
-->
<Header />

<slot />

<footer class="footer">
	<div class="content has-text-centered">
		<p>
			Brought to you by <a href="https://sipb.mit.edu" target="_blank" rel="noopener">SIPB</a>.
            The source code is available on <a href="https://github.com/gabrc52/class_group_chats/">GitHub</a>.
		</p>
		<p>
			Contact: <a href="mailto:matrix@mit.edu">matrix@mit.edu</a>
		</p>
	</div>
</footer>
