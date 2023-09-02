import { MATRIX_HOMESERVER } from '$env/static/private';

/**
 * Calculate the room alias of a given subject chat
 * 
 * @param subject an existing, valid canonical subject number
 * @param term the term for the given chat, in Hydrant format (e.g. f23)
 * @returns the generated room alias
 */
export function getRoomAlias(subject: string, term: string): string {
    const aliasLocalpart = `#${subject}_${term.toLowerCase()}`;
    const alias = `${aliasLocalpart}:${MATRIX_HOMESERVER}`;
    return alias;
}
