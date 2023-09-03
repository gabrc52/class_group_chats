<!--
    Component with subject details and the option to join the group chat
-->

<script lang="ts">
	import type { Subject, SubjectDetails, MembershipResult, SubjectChatDetails } from '$lib/types';
	import { ClassGroupChatMembership } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	export let subject: Subject;

	const mxid: Readable<string> = getContext('mxid');

	async function getSubjectDetails(number: string): Promise<SubjectDetails> {
		const response = await fetch(`/classes/api/subject/${number}`);
		const json = await response.json();
		return json;
	}

	async function getSubjectChat(number: string): Promise<SubjectChatDetails> {
		const response = await fetch(`/classes/api/chat/${number}`);
		const json = await response.json();
		return json;
	}

	async function getMembership(number: string, mxid: string): Promise<ClassGroupChatMembership> {
		const response = await fetch(`/classes/api/chat/${number}/member/${mxid}`);
		const json: MembershipResult = await response.json();
		return json.membership;
	}
</script>

{#await Promise.all([getSubjectDetails(subject.number), getSubjectChat(subject.number), getMembership(subject.number, $mxid)])}
	<div class="section">
		<div class="container is-max-desktop">
			<h1 class="title">{subject.number}</h1>
			<h2 class="subtitle">{subject.name}</h2>
			<progress class="progress is-info" max="100">30%</progress>
		</div>
	</div>
{:then [canonicalSubject, chat, membership]}
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
								<span class="icon">
									<!-- TODO fa-user-check if already inside -->
									<!-- fa-user-xmark if banned-->
									<i class="fa-solid" class:fa-user-check={membership === ClassGroupChatMembership.not_joined} />
								</span>
								<!-- TODO: dynamically update text "Invite me" "Invited!" -->
								<span>Invite me</span>
							</div>
						</button>
						<span class="button is-static">
							<span>{chat.numMembers}</span>
							<span class="icon">
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
