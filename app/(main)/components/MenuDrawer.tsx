'use client';

import { useColorMode } from "@/components/ui/color-mode";
import { createClient } from "@/utils/supabase/client";
import { Blockquote, Button, CloseButton, Drawer, IconButton, Portal } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuMenu, LuMoon, LuShieldHalf, LuSun, LuUserRound } from "react-icons/lu";
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
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)} size="full">
                <Drawer.Trigger asChild>
                    <IconButton variant="ghost" aria-label="Menu">
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

                                <MenuSection title="settings" items={[
                                    {
                                        label: "Profile",
                                        icon: <LuUserRound />,
                                        onClick: () => router.push("/profile")
                                    },
                                    {
                                        label: colorMode.colorMode === 'dark' ? "Switch to light mode" : "Switch to dark mode",
                                        icon: colorMode.colorMode === 'dark' ? <LuSun /> : <LuMoon />,
                                        onClick: colorMode.toggleColorMode
                                    }
                                ]} />

                                <MenuSection title="guilds" items={[
                                    {
                                        label: "View guilds",
                                        icon: <LuShieldHalf />,
                                        onClick: () => router.push("/guilds")
                                    }
                                ]} />
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Button width="full" onClick={handleSignOut}>Sign Out</Button>
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