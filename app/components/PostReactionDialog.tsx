'use client';

import { Dialog, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { EmojiPicker } from "./EmojiPicker";
import { LuSmilePlus } from "react-icons/lu";


interface PostReactionDialogProps {
    onAddReaction: (code: string) => void;
}

export const PostReactionDialog = ({ onAddReaction }: PostReactionDialogProps) => {
    const [open, setOpen] = useState(false);

    const handleOnSelect = (code: string) => {
        setOpen(false);
        onAddReaction(code);
    };

    return (
        <Dialog.Root open={open} onOpenChange={(event) => setOpen(event.open)}>
            <Dialog.Trigger asChild>
                <IconButton borderRadius="full" size="xs" variant="subtle">
                    <LuSmilePlus />
                </IconButton>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner>
                <Dialog.Content>
                    <Dialog.CloseTrigger />
                    <Dialog.Header>
                        <Dialog.Title />
                    </Dialog.Header>
                    <Dialog.Body>
                        <EmojiPicker onSelect={handleOnSelect} />
                    </Dialog.Body>
                    <Dialog.Footer />
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
};