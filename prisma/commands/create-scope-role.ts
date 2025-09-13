import { ScopeRole } from "@prisma/client";
import prisma from "..";

type CreateScopeRoleCommand = Omit<ScopeRole, 'role'> & { role?: ScopeRole['role']; };

export const createScopeRole = async ({ userId, scopeId, role = 'MEMBER' }: CreateScopeRoleCommand) => {
    await prisma.scopeRole.create({
        data: {
            userId,
            scopeId,
            role
        }
    });
};