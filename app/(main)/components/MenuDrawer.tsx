'use client';

import { useColorMode } from "@/components/ui/color-mode";
import { createClient } from "@/utils/supabase/client";
import { Blockquote, Button, CloseButton, Drawer, IconButton, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLogOut, LuMenu, LuMoon, LuSun } from "react-icons/lu";
import { MenuSection } from "./MenuSection";

export const MenuDrawer = () => {
    const [open, setOpen] = useState(false);
    const supabase = createClient();
    const router = useRouter();
    const colorMode = useColorMode();

    const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Sign out error:", error);
            return;
        }

        console.info("Successfully signed out");
        setOpen(false);
        router.refresh();
    };

    return (
        <>
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} placement="end">
                <Drawer.Trigger asChild>
                    <IconButton variant="ghost" aria-label="Menu" borderRadius="full">
                        <LuMenu />
                    </IconButton>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>Menu</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Blockquote.Root>
                                    <Blockquote.Content cite="Plato">
                                        You can discover more about a person in an hour of play than in a year of conversation.
                                    </Blockquote.Content>
                                    <Blockquote.Caption>
                                        — <cite>Plato</cite>
                                    </Blockquote.Caption>
                                </Blockquote.Root>

                                <MenuSection title="theme" items={[
                                    {
                                        label: colorMode.colorMode === 'dark' ? "Switch to light mode" : "Switch to dark mode",
                                        icon: colorMode.colorMode === 'dark' ? <LuSun /> : <LuMoon />,
                                        onClick: colorMode.toggleColorMode
                                    }
                                ]} />
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Button width="full" variant="outline" onClick={handleSignOut}><LuLogOut /> Sign Out</Button>
                            </Drawer.Footer>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root >
        </>
    );
};