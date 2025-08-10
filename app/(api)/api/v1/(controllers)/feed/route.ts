import { getUserFeed } from "@/prisma/queries/get-user-feed";
import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
        return new Response(JSON.stringify({ error: "User not authenticated" }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 401,
        });
    }

    const posts = await getUserFeed(data.user?.id);

    return new Response(JSON.stringify(posts), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}