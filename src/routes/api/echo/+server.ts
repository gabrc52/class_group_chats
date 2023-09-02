import { json } from '@sveltejs/kit';

export async function GET(e) {
    return json(e);
}