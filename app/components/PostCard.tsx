'use client';

import { Box, Card, Heading, IconButton, Wrap } from "@chakra-ui/react";
import { PostReactionDrawer } from "./PostReactionDrawer";
import { useEffect, useState } from "react";
import { useCreatePostReactionMutation } from "@/mutations/useCreatePostReactionMutation";
import { PostReaction } from "@prisma/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useDeletePostReactionMutation } from "@/mutations/useDeletePostReactionMutation";
import { PostReactionDialog } from "./PostReactionDialog";
import { codepointsToEmoji } from "@/utils/lib/code-to-emoji";

export interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
    reactions: PostReaction[];
}

interface GroupedReaction {
    code: string;
    count: number;
    userIds: string[];
}

interface PostCardProps {
    post: Post;
    scopeId?: number;
}

export const PostCard = ({ post, scopeId }: PostCardProps) => {
    const { user } = useAuthContext();
    const { mutateAsync: createPostReaction } = useCreatePostReactionMutation(post.id, Number(scopeId));
    const { mutateAsync: deletePostReaction } = useDeletePostReactionMutation(post.id, Number(scopeId));

    const [groupedReactions, setGroupedReactions] = useState<GroupedReaction[]>([]);

    const handleAddReaction = async (code: string) => {
        const alreadyReacted = user && post.reactions?.some((reaction: PostReaction) => reaction.reaction === code && reaction.userId === user.id);

        if (alreadyReacted) {
            await deletePostReaction({ reaction: code });
        } else {
            await createPostReaction({ reaction: code });
        }
    };

    useEffect(() => {
        const counts: Record<string, { count: number; userIds: string[]; }> = {};

        post.reactions?.forEach(({ reaction: code, userId }: PostReaction) => {
            if (!counts[code]) counts[code] = { count: 0, userIds: [] };
            counts[code].count += 1;
            counts[code].userIds.push(userId);
        });

        const grouped = Object.entries(counts).map(([code, { count, userIds }]) => ({
            code,
            count,
            userIds,
        }));

        setGroupedReactions(grouped);
    }, [post.reactions]);

    return (
        <Card.Root bg="bg" size="sm" borderRight="none" borderLeft="none" borderTop="none" borderRadius="0" key={post.id} px={0}>
            <Card.Header px={0}>
                <Heading size="xs" color="fg.muted">{post.finee} - {post.group}</Heading>
            </Card.Header>
            <Card.Body px={0}>
                {post.description}
            </Card.Body>
            <Card.Footer px={0}>
                <Wrap gap={2}>
                    {groupedReactions.map(({ code, count, userIds }) => {
                        const reactedByCurrentUser = user && userIds.includes(user.id);

                        return (
                            <IconButton
                                key={code}
                                borderRadius="full"
                                variant={reactedByCurrentUser ? "solid" : "subtle"}
                                size="xs"
                                px={2}
                                aria-label={`${code} reaction`}
                                onClick={() => handleAddReaction(code)}
                            >
                                {codepointsToEmoji(code)} {count}
                            </IconButton>
                        );
                    })}
                    <Box display={{ base: 'block', md: 'none' }}>
                        <PostReactionDrawer onAddReaction={handleAddReaction} />
                    </Box>
                    <Box display={{ base: 'none', md: 'block' }}>
                        <PostReactionDialog onAddReaction={handleAddReaction} />
                    </Box>
                </Wrap>
            </Card.Footer>
        </Card.Root>
    );
};