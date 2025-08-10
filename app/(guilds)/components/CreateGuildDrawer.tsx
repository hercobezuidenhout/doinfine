'use client';

import { Drawer, Portal, CloseButton, IconButton } from "@chakra-ui/react";
import { LuShieldPlus } from "react-icons/lu";
import { CreateGuildSteps } from "./CreateGuildSteps";

export const CreateGuildDrawer = () => {
    return (
        <Drawer.Root placement="bottom" size="full">
            <Drawer.Trigger asChild>
                <IconButton aria-label="Create guild">
                    <LuShieldPlus />
                </IconButton>
            </Drawer.Trigger>
            <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                    <Drawer.Content>
                        <Drawer.Header>
                            <Drawer.Title>Create new guild</Drawer.Title>
                        </Drawer.Header>
                        <Drawer.Body>
                            <CreateGuildSteps />
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