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

// god damn why are there 3 different ways of getting subjects
// except subjects API, that is probably redundant but the way you're supposed to use it

export type SubjectDetailsMulesoft = {
	canonicalNumber: string; // e.g. 6.1200 instead of 6.042 or 18.062, grad & undergrad number distinguishable
	title: string; // e.g. "Mathematics for Computer Science"
	cluster: string; // e.g. "(Same subject as 18.062J)"
	prerequisites: string; // e.g. "Calculus I (GIR)"
	units: string; // e.g. "5-0-7 REST"
	optional: string; // e.g. "Credit cannot also be received for 3.091, 5.111, 5.112, ES.5111, ES.5112"
	description: string; // subject description
	instructorKerbs: string[]; // e.g. ["hartz", "rcm", ...], or empty array if unknown
};

/**
 * A parsed subset of what Oracle returns
 */
export type SubjectDetailsOracle = {
	numStudents: number;
	masterNumber: string; // grad & undergrad number indistinguishable
	
	/**
	 * List of subject numbers (including this one)
	 */
	otherNumbers: string[];

	/**
	 * Short title, may use a lot of abbreviations
	 */
	title: string;
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
