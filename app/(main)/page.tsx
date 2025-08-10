'use client';

import { Box, Heading, Card, VStack } from "@chakra-ui/react";
import { NewPostButton } from "./components/NewPostButton";
import { useFeedQuery } from "@/queries/useFeedQuery";

interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
}

export default function Home() {
    const { data } = useFeedQuery();

    return (
        <Box minH="100vh" display="flex" mt={10} flexDirection="column" alignItems="center" justifyContent="center">
            {data?.length > 0 && (
                <Box mt={8} width="full" p={4}>
                    <VStack alignItems="stretch" gap={8}>
                        {data.map((post: Post) => (
                            <Card.Root size="md" key={post.id}>
                                <Card.Header>
                                    <Heading size="xs" color="fg.muted">{post.finee} - {post.group}</Heading>
                                </Card.Header>
                                <Card.Body>
                                    {post.description}
                                </Card.Body>
                            </Card.Root>
                        ))}
                    </VStack>
                </Box>
            )}
            <NewPostButton />
        </Box>
    );
}
