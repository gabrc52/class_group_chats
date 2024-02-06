import { redirect } from '@sveltejs/kit';
import httpStatus from 'http-status';

export async function load({ url }) {
	// Redirect user to the home page if no classes given
	const subjects = url.searchParams.getAll('class');
	if (subjects.length === 0) {
		redirect(httpStatus.FOUND, '/classes/');
	}
}
