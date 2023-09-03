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

{#await getSubjectDetails(subject.number)}
	<div class="section">
		<div class="container is-max-desktop">
			<h1 class="title">{subject.number}: {subject.name}</h1>
			<progress class="progress is-info" max="100">30%</progress>
		</div>
	</div>
{:then canonicalSubject}
	<div class="section">
		<div class="container is-max-desktop">
			<div class="level">
				<div class="level-left">
					<h1 class="title">{canonicalSubject.canonicalNumber}: {canonicalSubject.title}</h1>
				</div>
				<div class="level-right">
					<button class="button">
						<div class="icon-text">
							<span class="icon has-text">
								<!-- TODO fa-user-check if already inside -->
								<i class="fa-solid fa-user-plus" />
							</span>
							<span>Invite me</span>
						</div>
					</button>
				</div>
			</div>
			<p>{canonicalSubject.description}</p>
		</div>
	</div>
{/await}
