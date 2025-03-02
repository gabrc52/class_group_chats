import { PUBLIC_HYDRANT_BASEURL } from '$env/static/public';

// TODO: figure out how to use the Terms API, and use it to get the latest term.

/**
 * Get the latest term in Hydrant format (e.g. f23)
 */
export async function getLatestTermHydrant() {
	// TODO: ngl we should cache this
	const response = await fetch(`${PUBLIC_HYDRANT_BASEURL}/latestTerm.json`);
	const json = await response.json();
	return json.semester.urlName;
}

/**
 * Get the latest term in Subject API format (e.g. 2023FA)
 * This format is used by data warehouse as well.
 */
export async function getCurrentTerm() {
	const date = new Date();
	const year = date.getFullYear();
	try {
		return toSubjectsApi(await getLatestTermHydrant());
	} catch (e) {
		console.log(e, 'manually computing term instead');
		const month = date.getMonth(); // 0-indexed
		const NOT_SPRING_ANYMORE = 5;
		return month >= NOT_SPRING_ANYMORE ? `${year + 1}FA` : `${year}SP`;
	}
}

/**
 * Convert from Hydrant term format to subject API format
 */
export function toSubjectsApi(term: string) {
	const date = new Date();
	const year = date.getFullYear();
	if (term.length !== 3) {
		throw Error(`${term} is not 3-characters long`);
	}
	const conversions = new Map([
		['s', 'SP'],
		['f', 'FA']
	]);
	const convertedTerm = conversions.get(term[0])!;
	const century = year.toString().substring(0, 2);
	const relativeYear = term.substring(1);

	// Hydrant calls f23 the fall of the year 2023
	// The subjects API calls 2023FA the fall of the year 2022-2023
	// So we may need to add 1!!!
	const academicYear =
		Number.parseInt(`${century}${relativeYear}`) + (convertedTerm === 'FA' ? 1 : 0);

	return `${academicYear}${convertedTerm}`;
}
