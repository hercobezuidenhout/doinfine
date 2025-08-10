'use client';

import { Drawer, Button, Portal, CloseButton } from "@chakra-ui/react";
import { PostStepper } from "./PostStepper";
import { useState } from "react";

const DEFAULT_TITLE = "Fine someone";

export const PostDrawer = () => {
    const [title, setTitle] = useState(DEFAULT_TITLE);
    const [open, setOpen] = useState(false);

    return (
        <Drawer.Root placement='bottom' size='full' open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Drawer.Trigger asChild>
                <Button width="full">
                    Fine someone
                </Button>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content
                        roundedTopLeft="l3"
                    >
                        <Drawer.Header>
                            <Drawer.Title>{title}</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <PostStepper onStepChange={(stepTitle) => setTitle(stepTitle)} onDone={() => setOpen(false)} />
                        </Drawer.Body>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};