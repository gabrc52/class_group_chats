import {
	MULESOFT_SUBJECT_API,
	MULESOFT_CLIENT_ID,
	MULESOFT_CLIENT_SECRET
} from '$env/static/private';
import he from 'he';
import { SubjectNotFoundError, type SubjectDetails } from '$lib/types';
import { getSubjectsApiTerm } from '$lib/terms';

function getCanonicalNumber(subjectItem: any): string {
	if (!subjectItem.cluster) {
		return subjectItem.subjectId;
	}
	const description: string = subjectItem.description;
	// TODO: the only way I could think of getting the canonical subject,
	// but it could break at any time
	const notCanonicalRegex = /See description under subject (.+)J\./;
	const match = notCanonicalRegex.exec(description);
	if (!match) {
		return subjectItem.subjectId;
	}
	return match[1];
}

/**
 * Get the details about a subject.
 * Currently uses the Subjects API.
 *
 * @param subject the canonical subject number (i.e. 6.1010)
 * @returns the details about said subject
 * @throws SubjectNotFoundError if the subject does not exist
 *  or is not offered this term
 */
export async function getSubjectDetails(subject: string): Promise<SubjectDetails> {
	const term = await getSubjectsApiTerm();
	const url = `${MULESOFT_SUBJECT_API}/terms/${term}/subjects/${subject}`;
	const response = await fetch(url, {
		headers: {
			client_id: MULESOFT_CLIENT_ID,
			client_secret: MULESOFT_CLIENT_SECRET
		}
	});
	if (!response.ok) throw new SubjectNotFoundError();
	const json = await response.json();
	if (json.item.offered !== true) throw new SubjectNotFoundError();
	const canonicalNumber = getCanonicalNumber(json.item);
	if (canonicalNumber !== subject) {
		return getSubjectDetails(canonicalNumber);
	}
	const instructorKerbs = json.item.instructorDetails
		? json.item.instructorDetails.map((i: { kerbId: string }) => i.kerbId.toLowerCase())
		: [];
	// Some fields may contain HTML entities, so we unescape them
	return {
		canonicalNumber: canonicalNumber,
		title: he.decode(json.item.title),
		cluster: he.decode(json.item.cluster),
		prerequisites: he.decode(json.item.prerequisites),
		units: json.item.units,
		optional: he.decode(json.item.optional),
		description: he.decode(json.item.description),
		instructorKerbs: instructorKerbs
	};
}
