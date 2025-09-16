import { getPostReactions } from "@/prisma/queries/get-post-reactions";
import { NextParams } from "@/types/next-params";

export async function GET(request: Request, { params }: NextParams<{ postId: number; }>) {
    const { postId } = await params;
    const reactions = await getPostReactions(Number(postId));

    return new Response(JSON.stringify(reactions));
}

export async function POST(request: Request, { params }: NextParams<{ postId: number; }>) {
    const { postId } = await params;

    const body = await request.json();

    return new Response(JSON.stringify({ postId, body }));   
}