import { createInviteResponse } from "@/prisma/commands/create-invite-response";
import { createScopeRole } from "@/prisma/commands/create-scope-role";
import { getInvitationById } from "@/prisma/queries/get-invitation-by-id";
import { NextParams } from "@/types/next-params";
import { getUser } from "@/utils/supabase/server";
import { InviteResponseType } from "@prisma/client";

export async function POST(
    request: Request,
    { params }: NextParams<{ invitationId: number; }>
) {
    const { invitationId } = await params;
    const invitation = await getInvitationById(Number(invitationId));

    if (!invitation) {
        return new Response(JSON.stringify({ status: "error", message: "Invitation not found" }), {
            status: 404,
        });
    }

    const user = await getUser();

    if (!user) {
        return new Response(JSON.stringify({ status: "error", message: "Unauthorized" }), {
            status: 401,
        });
    }

    const body = await request.json();

    await createInviteResponse({
        invitationId: invitation.id,
        userId: user.id,
        responseType: body.responseType,
    });

    if (body.responseType === InviteResponseType.ACCEPTED) {
        await createScopeRole({
            userId: user.id,
            scopeId: invitation.scopeId
        });
    }

    return new Response(JSON.stringify({ status: "success" }), {
        headers: {
            "Content-Type": "application/json",
        },
    });
}