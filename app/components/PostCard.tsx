'use client';

import { Card, Heading, IconButton } from "@chakra-ui/react";
import { codepointsToEmoji } from "./EmojiPicker";
import { PostReactionDrawer } from "./PostReactionDrawer";
import { useState } from "react";

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
    const [reactions, setReactions] = useState<string[]>([]);

    const handleAddReaction = (code: string) => {
        setReactions((prev) => [...prev, code]);
    };

    return (
        <Card.Root size="md" key={post.id}>
            <Card.Header>
                <Heading size="xs" color="fg.muted">{post.finee} - {post.group}</Heading>
            </Card.Header>
            <Card.Body>
                {post.description}
            </Card.Body>
            <Card.Footer>
                {reactions.map((reaction, index) => <IconButton borderRadius="full" size="xs" key={index}>{codepointsToEmoji(reaction)}</IconButton>)}
                <PostReactionDrawer onAddReaction={handleAddReaction} />
            </Card.Footer>
        </Card.Root>
    );
};