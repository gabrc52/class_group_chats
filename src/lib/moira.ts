import { PUBLIC_MOIRA_API } from '$env/static/public';
import { getSubjectsApiTerm } from './terms';

async function getMoiraLists(ticket: string) {
	const response = await fetch(`${PUBLIC_MOIRA_API}/users/me/lists?recurse=false`, {
		headers: {
			Authorization: `webathena ${ticket}`
		}
	});
	return await response.json();
}

export async function getClassListFromMoira(ticket: string) {
	const lists: string[] = await getMoiraLists(ticket);
	const term = (await getSubjectsApiTerm()).toLowerCase();
	return lists
		.filter((list) => list.startsWith(`canvas-${term}_`) && list.endsWith('-st'))
		.map((list) => list.substring(14, list.length - 3).toUpperCase());
}
