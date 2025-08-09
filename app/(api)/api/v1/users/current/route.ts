import { createClient } from "@/utils/supabase/server";

export async function GET() {
    const supabase = await createClient();

    const currentUser = await supabase.auth.getUser();
    const currentSession = await supabase.auth.getSession();

    const responseData = JSON.stringify({
        user: currentUser,
        session: currentSession,
    });

    const repsonseOptions = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    return new Response(responseData, repsonseOptions);
}