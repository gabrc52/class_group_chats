import { getSubjectDetailsOracle } from '$lib/subject';
import { SubjectNotFoundError } from '$lib/types';
import { error, json } from '@sveltejs/kit';

// Since we are migrating the code as we go, /api/subject/ was used by the old version
// but the redesign will use /api/subjectWarehouse.

// The method of getting the canonical subject with the Subjects API was hacky due
// to limitations of the Subjects API, and didn't group together people in classes
// with both a grad and undergrad number

export async function GET({ params }) {
	try {
		return json(await getSubjectDetailsOracle(params.subject));
	} catch (e) {
		if (e instanceof SubjectNotFoundError) {
			error(404, 'subject not found');
		} else {
			throw e;
		}
	}
}
