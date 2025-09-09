import { Invitation } from "@prisma/client";
import prisma from "..";

export type CreateInvitationCommand = Pick<Invitation, 'hash' | 'expiresAt' | 'createdByUserId' | 'scopeId' | 'defaultRole'>;

export const createInvitation = async (command: CreateInvitationCommand) => {
    const invite = await prisma.invitation.create({
        data: {
            scopeId: command.scopeId,
            createdByUserId: command.createdByUserId,
            expiresAt: command.expiresAt,
            hash: command.hash,
            defaultRole: command.defaultRole || 'MEMBER'
        }
    });

    return invite;
};