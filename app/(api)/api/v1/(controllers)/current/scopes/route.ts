import { getUserScopes } from "@/prisma/queries/get-user-scopes";
import { getUser } from "@/utils/supabase/server";

export async function GET() {
    const user = await getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: "User not authenticated" }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 401,
        });
    }

    const scopes = await getUserScopes(user.id);

    return new Response(JSON.stringify(scopes), {
        headers: {
            "Content-Type": "application/json",
        },
        status: 200,
    });
}