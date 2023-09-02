import { getSubjectDetails, SubjectNotFoundError } from '$lib/subject';
import { error, json } from '@sveltejs/kit';
import { PUBLIC_HYDRANT_BASEURL } from "$env/static/public";

// TODO: deal with classes with multiple numbers

/**
 * We only care about a few stuff
 */
type HydrantClass = {
    number: string,
    name: string,
    // description: string,
    // instructor: string,
    level: string,
}

async function getAllHydrantClasses() {
    // TODO: cache this :)
    const response = await fetch(`${PUBLIC_HYDRANT_BASEURL}/latest.json`);
    const json = await response.json();
    const allClasses: any[] = Object.values(json.classes);
    return allClasses.map<HydrantClass>((c) => ({
        number: c.no,
        name: c.n,
        // description: c.d,
        // instructor: c.i,
        level: c.le,
    }));
}

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