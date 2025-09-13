import { Post } from "@prisma/client";
import prisma from "..";

type CreatePostCommand = Pick<Post, 'description' | 'issuedById' | 'issuedToId' | 'scopeId' | 'type'>;

export const createPost = async ({ ...command }: CreatePostCommand) => {
    await prisma.post.create({
        data: {
            ...command
        }
    });
};