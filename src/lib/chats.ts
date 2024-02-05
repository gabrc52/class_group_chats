import { PUBLIC_MATRIX_HOMESERVER, PUBLIC_ROOM_ALIAS_PREFIX } from '$env/static/public';
import { Preset, Visibility } from 'matrix-js-sdk';
import { matrixClient } from './matrix';
import { power_level_content_override } from './powerLevels';
import type { SubjectDetails } from './types';

function getRoomAliasLocalpart(subject: string, term: string): string {
	return `${PUBLIC_ROOM_ALIAS_PREFIX}${subject}_${term.toLowerCase()}`;
}

// TODO: update to get master subject ID from warehouse
/**
 * Calculate the room alias of a given subject chat
 *
 * @param subject an existing, valid canonical subject number
 * @param term the term for the given chat, in Subject API format (e.g. 2023FA)
 * @returns the generated room alias
 */
export function getRoomAlias(subject: string, term: string): string {
	const aliasLocalpart = getRoomAliasLocalpart(subject, term);
	const alias = `#${aliasLocalpart}:${PUBLIC_MATRIX_HOMESERVER}`;
	return alias;
}

export async function createChat(subjectDetails: SubjectDetails, term: string) {
	const { canonicalNumber, title, description } = subjectDetails;
	const response = await matrixClient.createRoom({
		room_alias_name: getRoomAliasLocalpart(canonicalNumber, term),
		name: `${canonicalNumber} ${title}`,
		topic: description,
		visibility: Visibility.Private,
		preset: Preset.TrustedPrivateChat,
		power_level_content_override: power_level_content_override
	});
	const roomId = response.room_id;
	// tell our custom plugin that this room is student-only
	await matrixClient.sendStateEvent(roomId, 'edu.mit.sipb.student_only', {}, '');
	return roomId;
}
