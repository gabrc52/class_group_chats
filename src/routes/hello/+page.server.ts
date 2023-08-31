import { matrixClient } from '$lib';

export async function load(e) {
    const response = await matrixClient.whoami();
    return {
        user: response.user_id,
    };
}