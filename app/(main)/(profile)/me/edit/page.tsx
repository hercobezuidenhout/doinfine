'use client';

import { BackButton } from "@/app/(main)/components/BackButton";
import { VStack, HStack, Heading, Center, Spinner } from "@chakra-ui/react";
import { EditProfileForm } from "./components/EditProfileForm";
import { useMeQuery } from "@/queries/useMeQuery";

export default function Page() {
    const { data: currentUser, isLoading } = useMeQuery();

    return isLoading ? (
        <Center height="60vh">
            <Spinner />
        </Center>
    ) : (
        <VStack alignItems="stretch" gap={4}>
            <VStack alignItems="start" width="full">
                <BackButton href="/me" />
                <HStack justifyContent="space-between" width="full">
                    <HStack>
                        <Heading size={{ base: "3xl", md: "5xl" }}>Edit profile</Heading>
                    </HStack>
                </HStack>
            </VStack>
            {currentUser && <EditProfileForm user={{
                id: currentUser.id || "",
                name: currentUser.name || '',
                aboutMe: currentUser.aboutMe || ''
            }} />}
        </VStack>
    );
}