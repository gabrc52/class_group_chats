import oracledb from 'oracledb';
import { WAREHOUSE_USERNAME, WAREHOUSE_PASSWORD } from '$env/static/private';
import assert from 'assert';

/**
 * http://web.mit.edu/warehouse/metadata/fields/subject_offered.html
 * 
 * Thanks to psvenk for figuring out how to use the Data Warehouse with NodeJS:
 * https://github.com/psvenk/fireroad-warehouse/blob/master/src/fetch.ts
 */

let pool: oracledb.Pool;

// copied from psvenk's code
/**
 * Init Oracle DB if needed
 */
async function init(): Promise<void> {
	console.log("init ran", process.env.ORACLE_HOME, process.env.LD_LIBRARY_PATH);
	assert(process.env.ORACLE_HOME !== undefined);
	console.log(WAREHOUSE_USERNAME);
	if (pool !== undefined) {
		return;
	}

	if (!WAREHOUSE_USERNAME || !WAREHOUSE_PASSWORD) {
		throw 'WAREHOUSE_USERNAME and/or WAREHOUSE_PASSWORD not provided';
	}

	// This line isn't in psvenk's code but my code didn't work otherwise.
	// https://node-oracledb.readthedocs.io/en/latest/user_guide/initialization.html
	oracledb.initOracleClient();

	pool = await oracledb.createPool({
		user: WAREHOUSE_USERNAME,
		password: WAREHOUSE_PASSWORD,
		connectString: 'warehouse',
		queueMax: -1,
		queueTimeout: 0
	});
}

/**
 * Perform an Oracle query
 * 
 * @param query the query string itself, it can contain :parameters
 * @param parameters the parameters (as a JS object with the same keys as in the query)
 * @returns a list of JS objects representing the result(s) of the query
 */
export async function oracleQuery<T>(
	query: string,
	parameters: oracledb.BindParameters
): Promise<T[] | undefined> {
	await init();
	let connection: oracledb.Connection | undefined;
	try {
		connection = await pool.getConnection();
		const result = await connection.execute<any>(query, parameters, {
			outFormat: oracledb.OUT_FORMAT_OBJECT
		});
		return result.rows;
	} finally {
		if (connection) {
			await connection.close();
		}
	}
}

