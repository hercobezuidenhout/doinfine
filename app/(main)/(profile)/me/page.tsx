import { getUserById } from "@/prisma/queries/get-user-by-id";
import { getUser } from "@/utils/supabase/server";
import { VStack, HStack, Heading, Card, Text, IconButton, Link } from "@chakra-ui/react";
import { BackButton } from "../../components/BackButton";
import { LuPen } from "react-icons/lu";

export default async function Page() {
    const currentUser = await getUser();
    const user = await getUserById(currentUser.id);

    return (
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