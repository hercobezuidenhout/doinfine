import { getUserFeed } from "@/prisma/queries/get-user-feed";
import { getUser } from "@/utils/supabase/server";

export async function GET(request: Request, { params }: { params: Promise<{ scopeId?: string; }>; }) {
    const param = await params;

    const user = await getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const posts = await getUserFeed(user.id, param && param.scopeId ? Number(param.scopeId) : undefined);

    return new Response(JSON.stringify(posts), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}