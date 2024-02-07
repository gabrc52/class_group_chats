import { redirect } from '@sveltejs/kit';
import httpStatus from 'http-status';

export async function load({ url }) {
	redirect(httpStatus.FOUND, `/classes/hydrantCallback${url.search}`);
}
