import { getSubjectDetailsMulesoft } from '$lib/subject';
import { SubjectNotFoundError, type Subject } from '$lib/types';
import { error, json } from '@sveltejs/kit';
import { PUBLIC_HYDRANT_BASEURL } from '$env/static/public';

async function getAllHydrantClasses() {
	// TODO: cache this :)
	const response = await fetch(`${PUBLIC_HYDRANT_BASEURL}/latest.json`);
	const json = await response.json();
	const allClasses: any[] = Object.values(json.classes);
	return allClasses.map<Subject>((c) => ({
		number: c.number,
		// it may be not defined, which is not an issue in JS as it becomes undefined
		// which does not get reflected in the JSON.
		oldNumber: c.oldNumber,
		name: c.name,
		// description: c.description,
		// instructor: c.inCharge,
		level: c.level
	}));
}

// deliberately not authenticated, since it is just subject details
export async function GET({ params }) {
	if (params.subject === 'all') {
		return json(await getAllHydrantClasses());
	}
	try {
		return json(await getSubjectDetailsMulesoft(params.subject));
	} catch (e) {
		if (e instanceof SubjectNotFoundError) {
			error(404, 'subject not found');
		} else {
			throw e;
		}
	}
}
