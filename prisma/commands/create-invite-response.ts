import { InviteResponse } from "@prisma/client";
import prisma from "..";

type CreateInviteResponseCommand = Pick<InviteResponse, 'userId' | 'invitationId' | 'responseType'>;

export const createInviteResponse = async ({ userId, invitationId, responseType }: CreateInviteResponseCommand) => {
    await prisma.inviteResponse.create({
        data: {
            userId,
            invitationId,
            responseType,
        },
    });
};