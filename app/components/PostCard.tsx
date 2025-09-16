'use client';

import { Card, Heading, IconButton } from "@chakra-ui/react";
import { codepointsToEmoji } from "./EmojiPicker";
import { PostReactionDrawer } from "./PostReactionDrawer";
import { useEffect, useState } from "react";
import { usePostReactionsQuery } from "@/queries/usePostReactionsQuery";

export interface Post {
    id: number;
    group: string;
    finee: string;
    description: string;
    createdAt: string;
}

interface PostCardProps {
    post: Post;
}

export const PostCard = ({ post }: PostCardProps) => {
    const { data } = usePostReactionsQuery(post.id);
    const [reactions, setReactions] = useState<string[]>([]);
    const [groupedReactions, setGroupedReactions] = useState<{ code: string; count: number; }[]>([]);

    const handleAddReaction = (code: string) => {
        setReactions((prev) => [...prev, code]);
    };

    console.log("data", data);

    useEffect(() => {
        const counts: Record<string, number> = {};

        reactions.forEach((code) => {
            counts[code] = (counts[code] || 0) + 1;
        });

        const grouped = Object.entries(counts).map(([code, count]) => ({ code, count }));
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
                {groupedReactions.map(({ code, count }) => (
                    <IconButton
                        onClick={() => handleAddReaction(code)}
                        borderRadius="full"
                        variant="subtle"
                        size="xs"
                        px={2}
                        key={code}
                        aria-label={`${code} reaction`}
                    >
                        {codepointsToEmoji(code)} {count}
                    </IconButton>
                ))}
                <PostReactionDrawer onAddReaction={handleAddReaction} />
            </Card.Footer>
        </Card.Root>
    );
};