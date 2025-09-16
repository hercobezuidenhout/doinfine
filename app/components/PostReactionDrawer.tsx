'use client';

import { Drawer, IconButton } from "@chakra-ui/react";
import { LuSmilePlus } from "react-icons/lu";
import { EmojiPicker } from "./EmojiPicker";
import { useState } from "react";

interface PostReactionDrawerProps {
    onAddReaction: (code: string) => void;
}

export const PostReactionDrawer = ({ onAddReaction }: PostReactionDrawerProps) => {
    const [open, setOpen] = useState(false);

    const handleOnSelect = (code: string) => {
        setOpen(false);
        onAddReaction(code);
    };

    return (
        <Drawer.Root placement="bottom" open={open} onOpenChange={() => setOpen(!open)}>
            <Drawer.Backdrop />
            <Drawer.Trigger>
                <IconButton borderRadius="full" size="xs">
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
                        <EmojiPicker onSelect={handleOnSelect} />
                    </Drawer.Body>
                    <Drawer.Footer />
                </Drawer.Content>
            </Drawer.Positioner>
        </Drawer.Root>
    );
};