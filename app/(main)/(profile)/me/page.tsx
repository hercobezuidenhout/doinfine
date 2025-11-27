'use client';

import { VStack, HStack, Heading, Card, Text, IconButton, Center, Spinner } from "@chakra-ui/react";
import { LuPen } from "react-icons/lu";
import { useMeQuery } from "@/queries/useMeQuery";
import { useRouter } from "next/navigation";

export default function Page() {
    const { data: user, isLoading } = useMeQuery();
    const router = useRouter();

    return isLoading ? (
        <Center height="60vh">
            <Spinner />
        </Center>
    ) : (
        <VStack alignItems="stretch" gap={4}>
            <VStack alignItems="start" width="full">
                <HStack justifyContent="space-between" width="full">
                    <HStack>
                        <Heading size={{ base: "3xl", md: "5xl" }}>{user?.name}</Heading>
                    </HStack>
                    <IconButton onClick={() => router.push('/me/edit')} aria-label="Edit profile" size="sm">
                        <LuPen />
                    </IconButton>
                </HStack>
            </VStack>
            {user?.aboutMe && (
                <Card.Root variant="subtle">
                    <Card.Body>
                        <Text>
                            {user?.aboutMe}
                        </Text>
                    </Card.Body>
                </Card.Root>
            )}
        </VStack>
    );
};