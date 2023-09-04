import WinChan from 'winchan';

const webathena_host = 'https://webathena.mit.edu';
const realm = 'ATHENA.MIT.EDU';
const principal = ['moira', 'moira7.mit.edu'];

/**
 * Logs in with WebAthena.
 *
 * Returns a promise that resolves with the result,
 * or raise the error.
 */
export function loginWebathena(): Promise<any> {
	let resolve: Function;
	let reject: Function;
	const promise = new Promise((resolver, rejecter) => {
		resolve = resolver;
		reject = rejecter;
	});
	WinChan.open(
		{
			url: `${webathena_host}/#!request_ticket_v1`,
			relay_url: `${webathena_host}/relay.html`,
			params: { realm, principal }
		},
		function (err: any, r: any) {
			if (err) {
				reject(err);
			} else if (r.status !== 'OK') {
				reject(err);
			} else {
				resolve(r.session);
			}
		}
	);
	return promise;
}

export function encodeTicket(webathena: any) {
	return btoa(JSON.stringify(webathena));
}

// This the same as /whoami on the moira-rest-api
export function getUsername(webathena: any) {
	return webathena.cname.nameString[0]
}