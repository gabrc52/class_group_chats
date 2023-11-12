<script>
	import { PUBLIC_ROOM_ALIAS_PREFIX } from "$env/static/public";
</script>

<section class="hero is-primary" id="header">
	<div class="hero-body content">
		<p class="title">Matrix class group chats</p>
		<p class="subtitle">
			Join group chats for your classes. Select and join your desired classes below and go to <a
				href="https://matrix.mit.edu" target="element" id="mlink">matrix.mit.edu</a
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

<style>
	#header {
		background-color: rgb(18, 154, 120);
	}
	#mlink {
		text-decoration: underline;
		color: rgb(249, 221, 138);	/**rgb(249, 212, 39)**/
	}
</style>
