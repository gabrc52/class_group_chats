import { error, json } from '@sveltejs/kit';
import { matrixClient } from '$lib/matrix';
import { API_SHARED_SECRET } from '$env/static/private';
import status from 'http-status';

export async function GET({ isSubRequest, request }) {
    if (isSubRequest || request.headers.get('shared_secret') == API_SHARED_SECRET) {
        const response = await matrixClient.whoami();
        return json(response);
    }
    throw error(status.UNAUTHORIZED, 'Please specify a shared_secret header');
}
