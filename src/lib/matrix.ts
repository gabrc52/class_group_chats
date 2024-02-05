import { MATRIX_TOKEN } from '$env/static/private';
import { PUBLIC_MATRIX_BASEURL } from '$env/static/public';
import { MatrixError } from 'matrix-js-sdk';
import * as matrix from 'matrix-js-sdk';

export const matrixClient = matrix.createClient({
	baseUrl: PUBLIC_MATRIX_BASEURL,
	accessToken: MATRIX_TOKEN
});

/**
 * Get the room ID for the given room alias
 *
 * @param subject an existing, valid canonical subject number
 * @param term the term for the given chat, in Hydrant format (e.g. f23)
 * @returns the room ID, or undefined if not found
 */
export async function getRoomId(alias: string): Promise<string | undefined> {
	try {
		const response = await matrixClient.getRoomIdForAlias(alias);
		return response.room_id;
	} catch (e) {
		if (e instanceof MatrixError && e.errcode === 'M_NOT_FOUND') {
			return undefined;
		} else {
			throw e;
		}
	}
}

/**
 * Count the number of members in a given Matrix room
 *
 * @param roomId a room ID which can be undefined
 * @returns the number of members in the given room
 */
export async function countMembers(roomId: string | undefined): Promise<number> {
	if (roomId === undefined) {
		return 0;
	}
	const members = (await matrixClient.getJoinedRoomMembers(roomId)).joined;
	const numMembers = Object.keys(members).length;
	// substract 1 since the bot doesn't count
	return numMembers - 1;
}
