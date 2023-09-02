import { getSubjectDetails, SubjectNotFoundError } from '$lib/subject';
import { error, json } from '@sveltejs/kit';

export async function GET({ params }) {
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