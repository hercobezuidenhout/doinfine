import prisma from "..";

export interface CreateScopeCommand {
    name: string;
    description?: string;
    userId: string;
    values?: string[];
}

export const createScope = async ({ name, description, userId, values }: CreateScopeCommand) => {
    const createdScope = await prisma.scope.create({
        data: {
            name,
            description,
            type: 'SPACE',
            roles: {
                create: {
                    userId
                }
            },
            scopeValues: {
                createMany: {
                    data: values?.map(value => ({ name: value, description: "Default description" })) || []
                }
            }
        }
    });

    return createdScope;
};