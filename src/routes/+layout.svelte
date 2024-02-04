<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import FeedbackIcon from "svelte-material-icons/MessageAlertOutline.svelte";
	import GitHubIcon from "svelte-material-icons/Github.svelte";
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar>
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase">Class group chats via [matrix]</strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/sipb/class_group_chats"
					target="_blank"
					rel="noreferrer"
				>
				<div style="padding-right: 4px;"><GitHubIcon/></div>
					Source code
				</a>
				<a
					id="feedback-button"
					class="btn btn-sm variant-ghost-surface"
					href="https://docs.google.com/forms/d/e/1FAIpQLSfIbAmtZeqLWCRx3L8_Hj28Nwh6TtsCjxN7OZjl8UisDkHgHw/viewform"
					target="_blank"
					rel="noreferrer"
				>
				<div style="padding-right: 4px;"><FeedbackIcon/></div>
					Give us feedback!
				</a>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="pageFooter">
		<!-- TODO: footer styling -->
		<!-- <p>
			Brought to you by <a href="https://sipb.mit.edu" target="_blank" rel="noopener">SIPB</a>.
            The source code is available on <a href="https://github.com/gabrc52/class_group_chats/">GitHub</a>.
		</p>
		<p>
			Contact: <a href="mailto:matrix@mit.edu">matrix@mit.edu</a>
		</p> -->
	</svelte:fragment>
	<slot />
</AppShell>

