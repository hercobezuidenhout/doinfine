import prisma from "..";

export const getUserScopes = async (userId: string) => {
    var userScopes = await prisma.scopeRole.findMany({
        where: { userId },
        include: {
            scope: true
        }
    });

    return userScopes.map(role => ({
        id: role.scope.id,
        name: role.scope.name,
        description: role.scope.description,
        createdAt: role.scope.createdAt,
        updatedAt: role.scope.updatedAt
    }));
};