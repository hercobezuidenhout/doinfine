import { createInvitation } from "@/prisma/commands/create-invitation";
import { getUser } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const body = await request.json();
    const user = await getUser();

    const createdInvite = await createInvitation({
        scopeId: body.scopeId,
        createdByUserId: user.id,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
        defaultRole: 'MEMBER',
        hash: crypto.randomUUID()
    });

    return new Response(JSON.stringify(createdInvite), {
        headers: { 'Content-Type': 'application/json' },
        status: 200
    });
}