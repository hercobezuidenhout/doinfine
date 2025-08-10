import { getUser } from "@/utils/supabase/server";

export async function GET() {
    const currentUser = await getUser();

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