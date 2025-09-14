import prisma from '../index';

export const getUserFeed = async (userId: string, scopeId?: number) => {
    var userScopeRoles = scopeId ? [] : await prisma.scopeRole.findMany({
        where: { userId },
        select: { scopeId: true }
    });

    const posts = await prisma.post.findMany({
        where: {
            scopeId: {
                in: scopeId ? [scopeId] : userScopeRoles.map(role => role.scopeId)
            }
        },
        include: {
            scope: {
                select: { name: true }
            },
            issuedTo: {
                select: { name: true }
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const results = posts.map(post => ({
        id: post.id,
        group: post.scope.name,
        finee: post.issuedTo?.name,
        description: post.description,
        createdAt: post.createdAt
    }));

    return results;
};