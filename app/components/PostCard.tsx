'use client';

import { Card, Drawer, Heading, IconButton } from "@chakra-ui/react";
import { LuSmilePlus } from "react-icons/lu";
import { EmojiPicker } from "./EmojiPicker";

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

    return (
        <Card.Root size="md" key={post.id}>
            <Card.Header>
                <Heading size="xs" color="fg.muted">{post.finee} - {post.group}</Heading>
            </Card.Header>
            <Card.Body>
                {post.description}
            </Card.Body>
            <Card.Footer>
                <Drawer.Root placement="bottom">
                    <Drawer.Backdrop />
                    <Drawer.Trigger>
                        <IconButton borderRadius="full" size="sm">
                            <LuSmilePlus />
                        </IconButton>
                    </Drawer.Trigger>
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.CloseTrigger />
                            <Drawer.Header>
                                <Drawer.Title />
                            </Drawer.Header>
                            <Drawer.Body>
                                <EmojiPicker onSelect={(emoji) => console.info(emoji)} />
                            </Drawer.Body>
                            <Drawer.Footer />
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Drawer.Root>
            </Card.Footer>
        </Card.Root>
    );
};