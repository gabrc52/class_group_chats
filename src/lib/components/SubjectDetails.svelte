<!--
    Component with subject details and the option to join the group chat
-->

<script lang="ts">
	import type { Subject, SubjectDetails, MembershipResult, SubjectChatDetails } from '$lib/types';
	import { ClassGroupChatMembership } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const Membership = ClassGroupChatMembership;

	export let subject: Subject;

	const mxid: Readable<string> = getContext('mxid');

	async function getSubjectDetails(number: string): Promise<SubjectDetails> {
		const response = await fetch(`/classes/api/subject/${number}`);
		const json = await response.json();
		return json;
	}

	$: subjectDetailsPromise = getSubjectDetails(subject.number);

	// It is important to use the canonical class number to check the membership
	// (NOTE: we are trusting the client, but I think that is fine)
	// TODO: use the canonical number on chat creation (necessary so it is fine)

	async function getSubjectChat(number: string): Promise<SubjectChatDetails> {
		const details = await subjectDetailsPromise;
		const { canonicalNumber } = details;
		const response = await fetch(`/classes/api/chat/${canonicalNumber}`);
		const json = await response.json();
		return json;
	}

	async function getMembership(number: string, mxid: string): Promise<ClassGroupChatMembership> {
		const details = await subjectDetailsPromise;
		const { canonicalNumber } = details;
		const response = await fetch(`/classes/api/chat/${canonicalNumber}/member/${mxid}`);
		const json: MembershipResult = await response.json();
		return json.membership;
	}

	let loading: boolean = false;

	async function invite(number: string, mxid: string): Promise<void> {
		loading = true;
		const response = await fetch(`/classes/api/chat/${number}/member/${mxid}`, {
			method: 'PUT'
		});
		// TODO: check if successful otherwise show an error
		subject = subject; // to reload upon inviting (hack?)
		loading = false;
	}
</script>

<!-- TODO: is promise.all actually what we want?
		   maybe we want to show subject info while the membership is loading, 
		   especially if we just clicked the join button
-->
{#await Promise.all([getSubjectDetails(subject.number), getSubjectChat(subject.number), getMembership(subject.number, $mxid)] )}
	<div class="section">
		<div class="container is-max-desktop">
			<div class="level">
				<div class="level-left">
					<div class="level-item">
						<h1 class="title">{subject.number}</h1>
					</div>
					<div class="level-item">
						<h2 class="subtitle">{subject.name}</h2>
					</div>
				</div>
			</div>
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
						<button
							class="button is-primary is-outlined"
							on:click={() => subject = subject}
						>
							<span class="icon">
								<i class="fa-solid fa-arrow-rotate-right"/>
							</span>
							<span>Refresh</span>
						</button>
					</div>
					<div class="level-item">
						<button
							class:is-loading={loading}
							class="button is-link"
							disabled={loading || membership !== Membership.not_joined}
							on:click={() => invite(canonicalSubject.canonicalNumber, $mxid)}
						>
							<div class="icon-text">
								<span class="icon">
									<i
										class="fa-solid"
										class:fa-user-plus={membership === Membership.not_joined}
										class:fa-user-clock={membership === Membership.invited}
										class:fa-user-check={membership === Membership.joined}
										class:fa-user-xmark={membership === Membership.banned}
									/>
								</span>
								<span>
									{#if membership === Membership.not_joined}
										Invite me
									{:else if membership === Membership.invited}
										Invited
									{:else if membership === Membership.banned}
										Banned
									{:else if membership === Membership.joined}
										You are in
									{/if}
								</span>
							</div>
						</button>
						<span class="button is-static">
							<!-- substract 1 since the bot doesn't count -->
							<span>{chat.numMembers}</span>
							<span class="icon">
								<i class="fa-solid fa-users" />
							</span>
						</span>
					</div>
				</div>
			</div>
			{#if membership == Membership.invited}
				<div class="notification is-warning">
					<!--button class="delete" /-->
					<p>
						You have already been invited to the chat. To accept the invite, go to
						<a href="https://matrix.mit.edu">
							matrix.mit.edu<span class="icon"><i class="fa fa-external-link-alt" /></span>
						</a>.
					</p>
					<p>
						You can also download <a href="https://matrix.mit.edu/mobile_guide/">Element</a> on your
						phone, and change your server to <strong>matrix.mit.edu</strong> before logging in.
					</p>
				</div>
			{/if}
			<p>{canonicalSubject.description}</p>
		</div>
	</div>
{/await}
