import prisma from "..";

export const getInvitationById = async (id: number) => {
    const invitation = await prisma.invitation.findUnique({
        where: { id }
    });

    return invitation;
};