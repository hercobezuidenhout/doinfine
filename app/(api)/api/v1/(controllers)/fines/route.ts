import {createPost} from "@/prisma/commands/create-post";
import {getUser} from "@/utils/supabase/server";
import {getScopeMembers} from "@/prisma/queries/get-scope-members";
import {getUserById} from "@/prisma/queries/get-user-by-id";
import {createNotification} from "@/utils/notifications/notifications";

export async function POST(request: Request) {
    const user = await getUser();

    if (!user) {
        return new Response("Unauthorized", {status: 401});
    }

    const body = await request.json();

    await createPost({
        description: body.description,
        issuedById: user.id,
        issuedToId: body.issuedToId,
        scopeId: body.scopeId,
        type: 'FINE'
    });

    const scopeMembers = await getScopeMembers(body.scopeId);
    const issuedToUser = await getUserById(body.issuedToId);
    const issuedByUser = await getUserById(body.issuedById);

    if (issuedByUser) {
        await createNotification({
            userId: body.issuedToId,
            type: "FINE",
            title: "You have been fined!",
            description: `${issuedByUser.name} has fined you for ${body.description}`,
            href: `/scopes/${body.scopeId}`
        })
    }

    if (issuedToUser && issuedByUser) {
        for (const scopeMember of scopeMembers) {
            await createNotification({
                userId: scopeMember.id,
                type: "FINE",
                title: `${issuedToUser.name} has been fined!`,
                description: `For ${body.description}`,
                href: `/scopes/${body.scopeId}`
            })
        }
    }

    return new Response(JSON.stringify({scopeId: body.scopeId}), {status: 201});
}