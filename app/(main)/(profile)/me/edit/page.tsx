import { getUser } from "@/utils/supabase/server";
import { getUserById } from "@/prisma/queries/get-user-by-id";
import { BackButton } from "@/app/(main)/components/BackButton";
import { VStack, HStack, Heading } from "@chakra-ui/react";
import { EditProfileForm } from "./components/EditProfileForm";

export default async function Page() {
    const currentUser = await getUser();
    const user = await getUserById(currentUser.id);

    return (
        <VStack alignItems="stretch" gap={4}>
            <VStack alignItems="start" width="full">
                <BackButton href="/me" />
                <HStack justifyContent="space-between" width="full">
                    <HStack>
                        <Heading size={{ base: "3xl", md: "5xl" }}>Edit profile</Heading>
                    </HStack>
                </HStack>
            </VStack>
            {user && <EditProfileForm user={{
                id: user.id || "",
                name: user.name || '',
                aboutMe: user.aboutMe || ''
            }} />}
        </VStack>
    );
}