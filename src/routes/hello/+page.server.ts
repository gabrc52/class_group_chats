import * as matrix from 'matrix-js-sdk';
import { MATRIX_TOKEN } from '$env/static/private';

export async function load(e) {
    const client = matrix.createClient({ 
        baseUrl: 'https://matrix-synapse.mit.edu',
        accessToken: MATRIX_TOKEN,
    });
    const response = await client.whoami();
    return {
        user: response.user_id,
    };
}