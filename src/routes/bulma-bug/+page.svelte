<script lang="ts">
	function doNothing() {
		alert('this button does nothing');
	}
</script>
Loading:
<div class="section">
	Disabled:
	<button disabled class="button is-loading is-link is-light" on:click={doNothing}>Hello world</button>
	<button disabled class="button is-loading is-link" on:click={doNothing}>Hello world</button>

	Not disabled:
	<button class="button is-loading is-link is-light" on:click={doNothing}>Hello world</button>
	<button class="button is-loading is-link" on:click={doNothing}>Hello world</button>
</div>
Not loading:
<div class="section">
	Disabled:
	<button disabled class="button is-link is-light" on:click={doNothing}>Hello world</button>
	<button disabled class="button is-link" on:click={doNothing}>Hello world</button>

	Not disabled:
	<button class="button is-link" on:click={doNothing}>Hello world</button>
	<button class="button is-link" on:click={doNothing}>Hello world</button>
</div>
