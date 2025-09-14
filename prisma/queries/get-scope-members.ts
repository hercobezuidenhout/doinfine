import prisma from "..";

export const getScopeMembers = async (scopeId: number) => {
    const members = await prisma.scopeRole.findMany({
        where: {
            scopeId,
        },
        include: {
            user: true,
        },
    });

    return members.map((member) => ({
        id: member.user.id,
        name: member.user.name,
        email: member.user.email,
    }));
};