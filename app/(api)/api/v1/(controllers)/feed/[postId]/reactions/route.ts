import { createPostReaction } from "@/prisma/commands/create-post-reaction";
import { deletePostReaction } from "@/prisma/commands/delete-post-reaction";
import { getPostReactions } from "@/prisma/queries/get-post-reactions";
import { NextParams } from "@/types/next-params";
import { getUser } from "@/utils/supabase/server";

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

    return new Response(JSON.stringify({ postId, body }));
}

export async function DELETE(request: Request, { params }: NextParams<{ postId: number; }>) {
    const { postId } = await params;
    const user = await getUser();
    const body = await request.json();

    await deletePostReaction({ userId: user.id, postId: Number(postId), reaction: body.reaction });

    return new Response(JSON.stringify({ postId }));
}