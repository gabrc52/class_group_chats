import { getSubjectDetails, SubjectNotFoundError, type Subject } from '$lib/subject';
import { error, json } from '@sveltejs/kit';
import { PUBLIC_HYDRANT_BASEURL } from "$env/static/public";

async function getAllHydrantClasses() {
    // TODO: cache this :)
    const response = await fetch(`${PUBLIC_HYDRANT_BASEURL}/latest.json`);
    const json = await response.json();
    const allClasses: any[] = Object.values(json.classes);
    return allClasses.map<Subject>((c) => ({
        number: c.no,
        // it may be not defined, which is not an issue in JS as it becomes undefined
        // which does not get reflected in the JSON.
        oldNumber: c.on,
        name: c.n,
        // description: c.d,
        // instructor: c.i,
        level: c.le,
    }));
}

// deliberately not authenticated, since it is just subject details
export async function GET({ params }) {
    if (params.subject === 'all') {
        return json(await getAllHydrantClasses());
    } else {
        try {
            return json(await getSubjectDetails(params.subject));
        } catch (e) {
            if (e instanceof SubjectNotFoundError) {
                throw error(404, 'subject not found');
            } else {
                throw e;
            }
        }
    }
}