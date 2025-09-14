import { createScope } from "@/prisma/commands/create-scope";
import { getUser } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const body = await request.json();
    const user = await getUser();

    const scope = await createScope({
        name: body.name,
        description: body.description,
        userId: user.id,
        values: body.rules
    });

    return new Response(JSON.stringify(scope), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
}