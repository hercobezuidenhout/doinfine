'use client';

import { Card, Heading, IconButton } from "@chakra-ui/react";
import { codepointsToEmoji } from "./EmojiPicker";
import { PostReactionDrawer } from "./PostReactionDrawer";
import { useEffect, useState } from "react";
import { usePostReactionsQuery } from "@/queries/usePostReactionsQuery";
import { useCreatePostReactionMutation } from "@/mutations/useCreatePostReactionMutation";
import { PostReaction } from "@prisma/client";
import { useAuthContext } from "@/contexts/AuthContext";

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
    const { mutateAsync } = useCreatePostReactionMutation(post.id);

    const [groupedReactions, setGroupedReactions] = useState<GroupedReaction[]>([]);

    const handleAddReaction = async (code: string) => {
        const alreadyReacted = user && reactions?.some((reaction: PostReaction) => reaction.reaction === code && reaction.userId === user.id);

        if (alreadyReacted) {
            alert('You have already reacted.');
            return;
        }

        await mutateAsync({ reaction: code });
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
                <PostReactionDrawer onAddReaction={handleAddReaction} />
            </Card.Footer>
        </Card.Root>
    );
};