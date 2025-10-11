import { createUser } from "@/prisma/commands/create-user";
import { getUserById } from "@/prisma/queries/get-user-by-id";
import { getUser } from "@/utils/supabase/server";

export const currentUserService = () => {
    const getCurrentUser = async () => {
        const currentUser = await getUser();

        const user = await getUserById(currentUser.id);

        if (user) {
            return user;
        }

        const createdUser = await createUser({
            id: currentUser.id,
            email: currentUser.email || ''
        });

        return createdUser;
    };

    return {
        getCurrentUser
    };
};