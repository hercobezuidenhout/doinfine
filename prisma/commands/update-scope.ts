import { Scope } from "@prisma/client";
import prisma from "..";

export type UpdateScopeCommand = Pick<Scope, 'id' | 'name' | 'description'>;

export const updateScope = async ({ id, name, description }: UpdateScopeCommand) =>
    await prisma.scope.update({
        where: { id }, // Example ID, replace with actual logic to determine the scope ID
        data: {
            name,
            description
        }
    });