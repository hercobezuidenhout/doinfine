import prisma from "..";

export const getInvitationByHash = async (hash: string) => {
    const invitation = await prisma.invitation.findUnique({
        where: { hash },
        include: { scope: true }
    });

    return invitation;
};