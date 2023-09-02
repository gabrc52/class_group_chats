import { matrixClient } from '$lib';

// Simple demo
// This variant calls Matrix directly

export async function load(e) {
    const response = await matrixClient.whoami();
    return {
        user: response.user_id,
    };
}