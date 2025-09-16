import prisma from "..";

export const getPostReactions = async (postId: number) =>
    await prisma.postReaction.findMany({
        where: {
            postId
        }
    });