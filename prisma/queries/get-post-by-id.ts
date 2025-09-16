import prisma from "@/prisma";

export const getPostById = async (postId: number) =>
    await prisma.post.findFirst({
        where: {
            id: postId
        },
        include: {
            issuedBy: true,
            scope: true
        }
    })