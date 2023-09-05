<script>
	import { PUBLIC_ROOM_ALIAS_PREFIX } from "$env/static/public";
</script>

<section class="hero is-primary">
	<div class="hero-body content">
		<p class="title">Matrix class group chats</p>
		<p class="subtitle">
			Join group chats for your classes. Select and join your desired classes below and go to <a
				href="https://matrix.mit.edu" target="element">matrix.mit.edu</a
			> to chat.
		</p>
	</div>

	{#if PUBLIC_ROOM_ALIAS_PREFIX.includes('test')}
		<div class="notification is-danger">
			<span class="icon">
				<i class="fa-solid fa-triangle-exclamation"></i>
			</span>
			Hi! You have discovered a link that is work-in-progress. This notice will be removed once the service is launched. <strong>The chats you join right now will be testing chats, so you will need to rejoin them if you test this...</strong> ~rgabriel
		</div>
	{/if}
</section>
