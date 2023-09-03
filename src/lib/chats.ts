import { PUBLIC_MATRIX_HOMESERVER } from '$env/static/public';
import { getSubjectDetails, getSubjectsApiTerm, toSubjectsApi } from "$lib/subject";
import { Preset, Visibility } from 'matrix-js-sdk';
import { matrixClient } from './matrix';
import { power_level_content_override } from './powerLevels';

export type SubjectChatDetails = {
    exists: boolean,
    alias: string,
    roomId: string,
    numMembers: number,
}

export enum ClassGroupChatMembership {
    not_joined = 'not_joined',
    invited = 'invited',
    joined = 'joined',
    banned = 'banned',
}

export type MembershipResult = {
    membership: ClassGroupChatMembership,
}

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
    const alias = `#${aliasLocalpart}:${PUBLIC_MATRIX_HOMESERVER}`;
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