'use client';

import { Box, Card, Heading, IconButton, Wrap } from "@chakra-ui/react";
import { codepointsToEmoji } from "./EmojiPicker";
import { PostReactionDrawer } from "./PostReactionDrawer";
import { useEffect, useState } from "react";
import { usePostReactionsQuery } from "@/queries/usePostReactionsQuery";
import { useCreatePostReactionMutation } from "@/mutations/useCreatePostReactionMutation";
import { PostReaction } from "@prisma/client";
import { useAuthContext } from "@/contexts/AuthContext";
import { useDeletePostReactionMutation } from "@/mutations/useDeletePostReactionMutation";
import { PostReactionDialog } from "./PostReactionDialog";

export interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
}

interface GroupedReaction {
    code: string;
    count: number;
    userIds: string[];
}

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const { user } = useAuthContext();
    const { data: reactions } = usePostReactionsQuery(post.id);
    const { mutateAsync: createPostReaction } = useCreatePostReactionMutation(post.id);
    const { mutateAsync: deletePostReaction } = useDeletePostReactionMutation(post.id);

    const [groupedReactions, setGroupedReactions] = useState<GroupedReaction[]>([]);

    const handleAddReaction = async (code: string) => {
        const alreadyReacted = user && reactions?.some((reaction: PostReaction) => reaction.reaction === code && reaction.userId === user.id);

        if (alreadyReacted) {
            await deletePostReaction({ reaction: code });
        } else {
            await createPostReaction({ reaction: code });
        }
    };

    useEffect(() => {
        const counts: Record<string, { count: number; userIds: string[]; }> = {};

        reactions?.forEach(({ reaction: code, userId }: PostReaction) => {
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
    }, [reactions]);

    return (
        <Card.Root size="md" key={post.id}>
            <Card.Header>
                <Heading size="xs" color="fg.muted">{post.finee} - {post.group}</Heading>
            </Card.Header>
            <Card.Body>
                {post.description}
            </Card.Body>
            <Card.Footer>
                <Wrap gap={2}>
                    {groupedReactions.map(({ code, count, userIds }) => {
                        const reactedByCurrentUser = user && userIds.includes(user.id);

                        return (
                            <IconButton
                                key={code}
                                borderRadius="full"
                                variant={reactedByCurrentUser ? "solid" : "subtle"} // highlight if reacted
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