import prisma from "..";

interface CreatePostReactionCommand {
    userId: string;
    postId: number;
    reaction: string;
}

export const createPostReaction = async ({ userId, postId, reaction }: CreatePostReactionCommand) =>
    await prisma.postReaction.create({
        data: {
            userId,
            postId,
            reaction
        }
    });