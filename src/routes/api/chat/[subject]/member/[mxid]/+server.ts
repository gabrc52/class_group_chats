import { authenticated } from "$lib/auth";
import { ClassGroupChatMembership, SubjectNotFoundError } from "$lib/types";
import { createChat, getRoomAlias } from "$lib/chats";
import { getRoomId, matrixClient } from "$lib/matrix";
import { getSubjectsApiTerm } from "$lib/subject";
import { error, json } from "@sveltejs/kit";
import { MatrixError } from "matrix-js-sdk";

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
        } else if (e instanceof MatrixError) {
            throw error(e.httpStatus ?? 500, e.data.error ?? 'a matrix error occurred');
        } else {
            throw e;
        }
    }
});

export const GET = authenticated(async function({ params }) {
    try {
        const { subject, mxid } = params;
        const term = await getSubjectsApiTerm();
        const alias = getRoomAlias(subject!, term);
        let roomId = await getRoomId(alias);
        if (roomId === undefined) {
            // room doesn't exist, we count is as you are not in the chat yet
            // (and it hasn't been created because no one has tried to join)
            return json({membership: ClassGroupChatMembership.not_joined});
        }
        let response: Record<string, any>;
        try {
            // getJoinedRoomMembers would have worked but would be O(N) instead of O(1)
            response = await matrixClient.getStateEvent(roomId, 'm.room.member', mxid!);    
        } catch(e) {
            // user has never been invited to the room
            return json({membership: ClassGroupChatMembership.not_joined});
        }
        const membership_conversion = new Map([
            ['ban', ClassGroupChatMembership.banned],
            ['invite', ClassGroupChatMembership.invited],
            ['join', ClassGroupChatMembership.joined]
        ]);
        // We treat anything else ('leave' and 'kick', or any unexpected values)
        // as not joined
        const membership = membership_conversion.get(response.membership) ?? ClassGroupChatMembership.not_joined;
        return json({membership});
    } catch (e) {
        if (e instanceof SubjectNotFoundError) {
            // This is never thrown because we never look up the subject.
            // it is probably fine, since we avoid the unnecessary API call
            // but mistakenly assume every class exists.
            // (This doesn't matter since PUT does validate that it exists)
            throw error(404, 'subject does not exist');
        } else if (e instanceof MatrixError) {
            console.log(e);
            throw error(e.httpStatus ?? 500, e.data.error ?? 'a matrix error occurred');
        } else {
            throw e;
        }
    }
});