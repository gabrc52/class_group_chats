import { MATRIX_HOMESERVER } from '$env/static/private';
import { getSubjectDetails, getSubjectsApiTerm, toSubjectsApi } from "$lib/subject";
import { Preset, Visibility } from 'matrix-js-sdk';
import { matrixClient } from './matrix';
import { power_level_content_override } from './powerLevels';

function getRoomAliasLocalpart(subject: string, term: string): string {
    return `subject_${subject}_${term.toLowerCase()}`;
}

/**
 * Calculate the room alias of a given subject chat
 * 
 * @param subject an existing, valid canonical subject number
 * @param term the term for the given chat, in Subject API format (e.g. 2023FA)
 * @returns the generated room alias
 */
export function getRoomAlias(subject: string, term: string): string {
    const aliasLocalpart = getRoomAliasLocalpart(subject, term);
    const alias = `#${aliasLocalpart}:${MATRIX_HOMESERVER}`;
    return alias;
}

export async function createChat(subject: string, term: string) {
    const { title, description } = await getSubjectDetails(subject);
    const response = await matrixClient.createRoom({
        room_alias_name: getRoomAliasLocalpart(subject, term),
        name: `${subject} ${title}`,
        topic: description,
        visibility: Visibility.Private,
        preset: Preset.TrustedPrivateChat,
        power_level_content_override: power_level_content_override,
    });
    return response.room_id;
}