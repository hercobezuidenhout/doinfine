'use client';

import { useFeedQuery } from "@/queries/useFeedQuery";
import { Box, VStack, Card, Heading } from "@chakra-ui/react";
import { NewPostButton } from "../(main)/components/NewPostButton";

interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
}

interface FeedProps {
    scopeId?: string;
}

export const Feed = ({ scopeId }: FeedProps) => {
    const { data } = useFeedQuery(Number(scopeId));

    return (
        <Box minH="100vh" display="flex" mt={scopeId ? 0 : 10} flexDirection="column" alignItems="center" justifyContent="center">
            {data?.length > 0 && (
                <Box mt={scopeId ? 0 : 8} width="full" p={4}>
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
};