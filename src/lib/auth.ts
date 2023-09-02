import { API_SHARED_SECRET } from "$env/static/private";
import { error } from "@sveltejs/kit";
import type { RequestHandler } from "@sveltejs/kit";
import status from 'http-status';

/**
 * Decorator that makes a function check for authentication
 * 
 * @param f a SvelteKit request handler
 * @returns a new SvelteKit request handler that checks for authentication
 *   (either called from SvelteKit itself or provided the correct shared secret)
 */
export function authenticated(f: RequestHandler): RequestHandler {
    return async function (e) {
        if (e.isSubRequest || e.request.headers.get('shared_secret') === API_SHARED_SECRET) {
            f(e);
        }
        throw error(status.UNAUTHORIZED, 'Please specify a shared_secret header');
    }
}
