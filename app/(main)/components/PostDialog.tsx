'use client';

import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { PostStepper } from "./PostStepper";
import { useState } from "react";


export const PostDialog = () => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog.Root open={open} onOpenChange={(event) => setOpen(event.open)}>
            <Dialog.Trigger asChild>
                <Button size="xl" fontSize="lg">Fine someone</Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Fine someone</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <PostStepper onDone={() => setOpen(false)} />
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};
