// For chats.ts
// Moved because it imports matrixClient which imports the Matrix access token,
// which we can't access in client-side code.

export type SubjectChatDetails = {
	exists: boolean;
	alias: string;
	roomId: string;
	numMembers: number;
};

export enum ClassGroupChatMembership {
	not_joined = 'not_joined',
	invited = 'invited',
	joined = 'joined',
	banned = 'banned'
}

export type MembershipResult = {
	membership: ClassGroupChatMembership;
};

// For subject.ts

export type SubjectDetails = {
	canonicalNumber: string; // e.g. 6.1200 instead of 6.042 or 18.062
	title: string; // e.g. "Mathematics for Computer Science"
	cluster: string; // e.g. "(Same subject as 18.062J)"
	prerequisites: string; // e.g. "Calculus I (GIR)"
	units: string; // e.g. "5-0-7 REST"
	optional: string; // e.g. "Credit cannot also be received for 3.091, 5.111, 5.112, ES.5111, ES.5112"
	description: string; // subject description
	instructorKerbs: string[]; // e.g. ["hartz", "rcm", ...], or empty array if unknown
};

export type Subject /* from hydrant */ = {
	number: string;
	oldNumber: string | undefined;
	name: string;
	// description: string,
	// instructor: string,
	level: string;
};

export class SubjectNotFoundError extends Error {}

export type UsernameExistsResult = {
	exists: boolean;
};
