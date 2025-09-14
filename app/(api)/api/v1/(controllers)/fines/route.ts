import { createPost } from "@/prisma/commands/create-post";
import { getUser } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const user = await getUser();

    if (!user) {
        return new Response("Unauthorized", { status: 401 });
    }

    const body = await request.json();

    await createPost({
        description: body.description,
        issuedById: user.id,
        issuedToId: body.issuedToId,
        scopeId: body.scopeId,
        type: 'FINE'
    });

    return new Response(JSON.stringify({ scopeId: body.scopeId }), { status: 201 });
}