import { createUser } from "@/prisma/commands/create-user";
import { getUserById } from "@/prisma/queries/get-user-by-id";
import { getUser } from "@/utils/supabase/server";

export async function GET() {
    const currentUser = await getUser();

    const user = await getUserById(currentUser.id);

    if (!user) {
        await createUser({
            id: currentUser.id,
            email: currentUser.email || ''
        });
    }

    const responseData = JSON.stringify({
        user: currentUser
    });

    const repsonseOptions = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    return new Response(responseData, repsonseOptions);
}