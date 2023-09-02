import { error, json } from '@sveltejs/kit';
import { matrixClient } from '$lib/matrix';
import { authenticated } from '$lib/auth.js';

// TypeScript does not provide top-level decorators
export const GET = authenticated(async function () {
    const response = await matrixClient.whoami();
    return json(response);
});

