<!--
    Component with subject details and the option to join the group chat
-->

<script lang="ts">
	import type { Subject, SubjectDetails } from '$lib/subject';

	export let subject: Subject;

	async function getSubjectDetails(number: string): Promise<SubjectDetails> {
		const response = await fetch(`/classes/api/subject/${number}`);
		const json = await response.json();
		return json;
	}
</script>

{#await Promise.all([getSubjectDetails(subject.number)])}
	<div class="section">
		<div class="container is-max-desktop">
			<h1 class="title">{subject.number}</h1>
			<h2 class="subtitle">{subject.name}</h2>
			<progress class="progress is-info" max="100">30%</progress>
		</div>
	</div>
{:then [canonicalSubject]}
	<div class="section">
		<div class="container is-max-desktop">
			<div class="level">
				<div class="level-left">
					<div class="level-item">
						<h1 class="title">{canonicalSubject.canonicalNumber}</h1>
					</div>
					<div class="level-item">
						<h2 class="subtitle">{canonicalSubject.title}</h2>
					</div>
				</div>
				<div class="level-right">
					<div class="level-item">
						<!-- TODO: is-loading if loading, disabled if already inside -->
						<button class="button is-link">
							<div class="icon-text">
								<span class="icon has-text">
									<!-- TODO fa-user-check if already inside -->
									<i class="fa-solid fa-user-plus" />
								</span>
								<!-- TODO: dynamically update text "Invite me" "Invited!" -->
								<span>Invite me</span>
							</div>
						</button>
						<span class="button is-static">
							<span>0</span>
							<span class="icon has-text">
								<i class="fa-solid fa-users" />
							</span>
						</span>
					</div>
				</div>
			</div>
			<!-- TODO: show conditionally -->
			<div class="notification is-warning">
				<!--button class="delete" /-->
				<p>You have already been invited to the chat. To accept the invite, go to
				<a href="https://matrix.mit.edu">
					matrix.mit.edu<span class="icon"><i class="fa fa-external-link-alt" /></span>
				</a>.</p>
				<p>You can also download <a href="https://matrix.mit.edu/mobile_guide/">Element</a> on
				your phone, and change your server to <strong>matrix.mit.edu</strong> before logging in.</p>
			</div>
			<p>{canonicalSubject.description}</p>
		</div>
	</div>
{/await}
