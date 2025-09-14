'use client';

import { useFeedQuery } from "@/queries/useFeedQuery";
import { Box, VStack, Card, Heading } from "@chakra-ui/react";

interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
}

interface FeedProps {
    scopeId?: number;
}

export const Feed = ({ scopeId }: FeedProps) => {
    const { data } = useFeedQuery(Number(scopeId));

    return data?.length > 0 && (
        <Box mt={4} width="full">
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
    );
};