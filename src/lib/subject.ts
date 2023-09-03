import { PUBLIC_HYDRANT_BASEURL } from "$env/static/public";
import { MULESOFT_SUBJECT_API, MULESOFT_CLIENT_ID, MULESOFT_CLIENT_SECRET } from "$env/static/private";
import assert from 'assert';
import { decode } from 'he';
import { SubjectNotFoundError, type SubjectDetails } from "./types";

// TODO: figure out how to use the Terms API, and use it to get the latest term.

/**
 * Get the latest term in Hydrant format (e.g. f23)
 */
export async function getLatestTerm() {
    const response = await fetch(`${PUBLIC_HYDRANT_BASEURL}/latestTerm.json`);
    const json = await response.json();
    return json.urlName;
}

/**
 * Get the latest term in Subject API format (e.g. 2023FA)
 */
export async function getSubjectsApiTerm() {
    const date = new Date();
    const year = date.getFullYear();
    try {
        return toSubjectsApi(await getLatestTerm());
    } catch (e) {
        const month = date.getMonth(); // 0-indexed
        const NOT_SPRING_ANYMORE = 5;
        return month >= NOT_SPRING_ANYMORE ? `${year}FA` : `${year}SP`;
    }
}

/**
 * Convert from Hydrant term format to subject API format
 */
export function toSubjectsApi(term: string) {
    const date = new Date();
    const year = date.getFullYear();
    assert.strictEqual(term.length, 3);
    const conversions = new Map([
        ['s', 'SP'],
        ['f', 'FA'],
    ]);
    const convertedTerm = conversions.get(term[0]) ?? assert.fail(`unknown prefix ${term[0]}`);
    const century = year.toString().substring(0, 2);
    const relativeYear = term.substring(1);
    
    // Hydrant calls f23 the fall of the year 2023
    // The subjects API calls 2023FA the fall of the year 2022-2023
    // So we may need to add 1!!!
    const academicYear = Number.parseInt(`${century}${relativeYear}`) + (
        convertedTerm === 'FA' ? 1 : 0
    );

    return `${academicYear}${convertedTerm}`;
}


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
            client_secret: MULESOFT_CLIENT_SECRET,
        },
    });
    if (!response.ok) throw new SubjectNotFoundError();
    const json = await response.json();
    if (json.item.offered !== true) throw new SubjectNotFoundError();
    const canonicalNumber = getCanonicalNumber(json.item);
    if (canonicalNumber !== subject) {
        return getSubjectDetails(canonicalNumber);
    }
    const instructorKerbs = json.item.instructorDetails
        ? json.item.instructorDetails.map((i: {kerbId: string}) => i.kerbId.toLowerCase())
        : [];
    // Some fields may contain HTML entities, so we unescape them
    return {
        canonicalNumber: canonicalNumber,
        title: decode(json.item.title),
        cluster: decode(json.item.cluster),
        prerequisites: decode(json.item.prerequisites),
        units: json.item.units,
        optional: decode(json.item.optional),
        // TODO: do we want to get the original description?
        // i'm not doing it to avoid the extra query since it's not actually used yet
        description: decode(json.item.description),
        instructorKerbs: instructorKerbs,
    };
}