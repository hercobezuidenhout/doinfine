import prisma from "..";

export const getUserById = async (userId: string) =>
    await prisma.user.findFirst({
        where: {
            id: userId
        }
    });