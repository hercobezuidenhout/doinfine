import { updateUser } from "@/prisma/commands/update-user";
import { User } from "@prisma/client";

export const profileService = () => {
    const updateProfile = async (profile: Pick<User, 'id' | 'name' | 'aboutMe'>) => {
        await updateUser(profile);
    };

    return {
        updateProfile
    };
};