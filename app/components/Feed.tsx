'use client';

import { useFeedQuery } from "@/queries/useFeedQuery";
import { Box, VStack } from "@chakra-ui/react";
import { Post, PostCard } from "./PostCard";

interface FeedProps {
    scopeId?: number;
}

export const Feed = ({ scopeId }: FeedProps) => {
    const { data } = useFeedQuery(Number(scopeId));

    return data?.length > 0 && (
        <Box mt={4} width="full">
            <VStack alignItems="stretch" gap={8}>
                {data.map((post: Post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </VStack>
        </Box>
    );
};