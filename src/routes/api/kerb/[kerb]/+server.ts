import { json } from '@sveltejs/kit';
import dns from 'node:dns';

export const GET = async function ({ params }) {
    try {
        const result = await dns.promises.resolve(`${params.kerb}.pobox.ns.athena.mit.edu`, 'TXT');
        return json({'exists': true});
    } catch (e: any) {
        if (e?.code === 'ENOTFOUND') {
            return json({'exists': false});
        } else {
            throw e;
        }
    }
}