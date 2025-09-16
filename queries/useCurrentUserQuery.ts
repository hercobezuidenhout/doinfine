import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUserQuery = () => {
    const { auth } = createClient();

    return useQuery({
        queryKey: ['currentUser'],
        queryFn: async () => await auth.getUser()
    });
};