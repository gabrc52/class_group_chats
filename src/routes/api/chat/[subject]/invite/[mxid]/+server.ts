import { authenticated } from "$lib/auth";
import { createChat, getRoomAlias } from "$lib/chats";
import { getRoomId, matrixClient } from "$lib/matrix";
import { SubjectNotFoundError, getSubjectsApiTerm } from "$lib/subject";
import { error, json } from "@sveltejs/kit";

export const PUT = authenticated(async function ({ params }) {
    // TODO: check if student and not staff (ideally)
    try {
        const { subject, mxid } = params;
        const term = await getSubjectsApiTerm();
        const alias = getRoomAlias(subject!, term);
        let roomId = await getRoomId(alias);
        if (roomId === undefined) {
            roomId = await createChat(subject!, term);
        }
        await matrixClient.invite(roomId, mxid!);
        return json({});
    } catch (e) {
        if (e instanceof SubjectNotFoundError) {
            throw error(404, 'subject does not exist');
        } else {
            throw e;
        }
    }
});

