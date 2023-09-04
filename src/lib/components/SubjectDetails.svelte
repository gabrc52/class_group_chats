<!--
    Component with subject details and the option to join the group chat
-->

<script lang="ts">
	import { PUBLIC_MATRIX_ROOM_LINK_BASE } from '$env/static/public';
import type { Subject, SubjectDetails, MembershipResult, SubjectChatDetails } from '$lib/types';
	import { ClassGroupChatMembership } from '$lib/types';
	import { getContext } from 'svelte';
	import type { Readable } from 'svelte/store';

	const Membership = ClassGroupChatMembership;

	export let subject: Subject;
	
	/**
	 * Whether this component is being rendered as an item in a list
	 */
	export let isListItem: boolean = false;

	// this implies hiding the description
	$: showDescription = !isListItem;

	const mxid: Readable<string> = getContext('mxid');

	async function getSubjectDetails(number: string): Promise<SubjectDetails> {
		const response = await fetch(`/classes/api/subject/${number}`);
		const json = await response.json();
		return json;
	}

	$: subjectDetailsPromise = getSubjectDetails(subject.number);

	// It is important to use the canonical class number to check the membership
	// (NOTE: we are trusting the client, but I think that is fine)

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
	<div class={isListItem ? "block" : "section"}>
		<div class="container is-max-desktop">
			<div class="level">
				<div class="level-left">
					<div class="level-item">
						<h1 class="title">{subject.number}</h1>
					</div>
					<div class="level-item">
						<span class="subtitle">{subject.name}</span>
					</div>
				</div>
				<!-- tidbit: if there is no subject name given, use that space for the lodaing indicator -->
				<div class="level-item">
					{#if !subject.name}
						<progress class="progress is-info" max="100">30%</progress>
					{/if}
				</div>
			</div>
			{#if subject.name}
				<progress class="progress is-info" max="100">30%</progress>
			{/if}
		</div>
	</div>
{:then [canonicalSubject, chat, membership]}
	<div class={isListItem ? "block" : "section"}>
		<div class="container is-max-desktop">
			<div class="level">
				<div class="level-left">
					<div class="level-item">
						<h1 class="title">{canonicalSubject.canonicalNumber}</h1>
					</div>
					<div class="level-item">
						<span class="subtitle">{canonicalSubject.title}</span>
					</div>
				</div>
				<div class="level-right">
					{#if !isListItem}
						<!-- I think it's too confusing/non-sensical to have several refresh buttons -->
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
					{/if}
					<div class="level-item">
						<button
							class:is-loading={loading}
							class="button is-link"
							class:is-light={isListItem}
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
						<span class="button is-static" class:is-light={isListItem}>
							<!-- substract 1 since the bot doesn't count -->
							<span>{chat.numMembers}</span>
							<span class="icon">
								<i class="fa-solid fa-users" />
							</span>
						</span>
					</div>
					{#if membership !== Membership.not_joined}
						<div class="level-item">
							<!-- slay: https://stackoverflow.com/questions/66166695/php-html-if-a-new-tab-already-exists-dont-create-a-new-one -->
							<!-- useful because Element dislikes having several tabs/windows open -->
							<a class="button" target="element" href="{PUBLIC_MATRIX_ROOM_LINK_BASE}{chat.alias}">
								<span class="icon">
									<i class="fa-solid fa-up-right-from-square"></i>
								</span>
							</a>
						</div>
					{/if}
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
			{#if showDescription}
				<p>{canonicalSubject.description}</p>
			{/if}
		</div>
	</div>
{/await}
