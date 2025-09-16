import { createPostReaction } from "@/prisma/commands/create-post-reaction";
import { deletePostReaction } from "@/prisma/commands/delete-post-reaction";
import { getPostReactions } from "@/prisma/queries/get-post-reactions";
import { NextParams } from "@/types/next-params";
import { createNotification } from "@/utils/notifications/notifications";
import { getUser } from "@/utils/supabase/server";
import {codepointsToEmoji} from "@/utils/lib/code-to-emoji";
import {getPostById} from "@/prisma/queries/get-post-by-id";
import {getUserById} from "@/prisma/queries/get-user-by-id";

export async function GET(request: Request, { params }: NextParams<{ postId: number; }>) {
    const { postId } = await params;
    const reactions = await getPostReactions(Number(postId));

    return new Response(JSON.stringify(reactions));
}

export async function POST(request: Request, { params }: NextParams<{ postId: number; }>) {
    const { postId } = await params;
    const user = await getUser();
    const body = await request.json();

    await createPostReaction({ userId: user.id, postId: Number(postId), reaction: body.reaction });

    const userDetails = await getUserById(user.id);
    const post = await getPostById(Number(postId))

    if (userDetails && post) {
        await createNotification({
            userId: user.id,
            type: "REACTION",
            title: `${codepointsToEmoji(body.reaction)} New reaction`,
            description: `${userDetails.name} reacted with ${codepointsToEmoji(body.reaction)} to your post in ${post.scope.name}`,
            href: `/scopes/${post.scope.id}`,
            metadata: {
                postId: Number(postId),
                actorId: user.id,
                reaction: body.reaction,
            },
        });
    }

    return new Response(JSON.stringify({ postId, body }));
}

export async function DELETE(request: Request, { params }: NextParams<{ postId: number; }>) {
    const { postId } = await params;
    const user = await getUser();
    const body = await request.json();

    await deletePostReaction({ userId: user.id, postId: Number(postId), reaction: body.reaction });

    return new Response(JSON.stringify({ postId }));
}