import { PostReaction } from "@prisma/client";
import prisma from "..";

type DeletePostReactionCommand = Pick<PostReaction, 'postId' | 'userId' | 'reaction'>;

export const deletePostReaction = async ({ postId, userId, reaction }: DeletePostReactionCommand) =>
    await prisma.postReaction.delete({
        where: {
            postId_userId_reaction: {
                postId,
                userId,
                reaction
            }
        }
    });