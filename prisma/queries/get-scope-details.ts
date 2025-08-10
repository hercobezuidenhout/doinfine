import prisma from "..";

export const getScopeDetails = async (scopeId: number) => {
    const scope = await prisma.scope.findFirst({
        where: {
            id: scopeId
        }
    });

    return ({
        id: scope?.id,
        name: scope?.name,
        description: scope?.description,
        createdAt: scope?.createdAt
    });
};