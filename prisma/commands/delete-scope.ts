import prisma from "..";

export const deleteScope = async (scopeId: number) =>
    await prisma.scope.delete({
        where: { id: scopeId }
    });