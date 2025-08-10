import { getUserFeed } from "@/prisma/queries/get-user-feed";
import { getUser } from "@/utils/supabase/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const scopeId = searchParams.get('scopeId');
    const user = await getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    const posts = await getUserFeed(user.id, scopeId ? Number(scopeId) : undefined);

    return new Response(JSON.stringify(posts), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}