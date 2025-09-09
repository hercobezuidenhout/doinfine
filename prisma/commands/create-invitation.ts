import { Invitation } from "@prisma/client";
import prisma from "..";

type CreateInvitationCommand = Omit<Invitation, 'id'>;

export const createInvitation = async (command: CreateInvitationCommand) => {
    const invite = await prisma.invitation.create({
        data: {
            ...command,
        }
    });

    return invite;
};