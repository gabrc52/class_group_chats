import { PUBLIC_MOIRA_API } from "$env/static/public";

async function getMoiraLists(ticket: string) {
    const response = await fetch(`${PUBLIC_MOIRA_API}/users/me/lists?recurse=false`, {
        headers: {
            Authorization: `webathena ${ticket}`
        },
    });
    return await response.json();
}

export async function getClassListFromMoira(ticket: string) {
    const lists: string[] = await getMoiraLists(ticket);
}