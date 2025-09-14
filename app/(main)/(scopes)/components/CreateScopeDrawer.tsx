'use client';

import { Drawer, Portal, CloseButton, IconButton } from "@chakra-ui/react";
import { LuPlus } from "react-icons/lu";
import { CreateScopeSteps } from "./CreateScopeSteps";
import { useState } from "react";
import { Scope } from "@prisma/client";
import { useRouter } from "next/navigation";

export const CreateScopeDrawer = () => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const handleScopeCreated = (scope: Scope) => {
        router.push(`/scopes/${scope.id}/created`);
    };

    return (
        <Drawer.Root placement={{ base: "bottom", md: 'end' }} size={{ base: "full", md: 'lg' }} open={open} onOpenChange={(event) => setOpen(event.open)}>
            <Drawer.Trigger asChild>
                <IconButton aria-label="Create group">
                    <LuPlus />
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Create new group</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <CreateScopeSteps onScopeCreated={handleScopeCreated} />
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