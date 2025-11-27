'use client';

import { VStack, HStack, Heading, Card, Text, IconButton, Link, Center, Spinner } from "@chakra-ui/react";
import { BackButton } from "../../components/BackButton";
import { LuPen } from "react-icons/lu";
import { useMeQuery } from "@/queries/useMeQuery";

export default function Page() {
    const { data: user, isLoading } = useMeQuery();

    return isLoading ? (
        <Center height="60vh">
            <Spinner />
        </Center>
    ) : (
        <VStack alignItems="stretch" gap={4}>
            <VStack alignItems="start" width="full">
                <BackButton href="/" />
                <HStack justifyContent="space-between" width="full">
                    <HStack>
                        <Heading size={{ base: "3xl", md: "5xl" }}>{user?.name}</Heading>
                    </HStack>
                    <Link href="/me/edit">
                        <IconButton aria-label="Edit profile" size="sm">
                            <LuPen />
                        </IconButton>
                    </Link>
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