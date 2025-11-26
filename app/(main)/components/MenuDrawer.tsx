'use client';

import { useColorMode } from "@/components/ui/color-mode";
import { createClient } from "@/utils/supabase/client";
import { Button, CloseButton, Drawer, IconButton, Portal, Stack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LuLogOut, LuMenu, LuMoon, LuSettings, LuSun } from "react-icons/lu";
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
                                <Stack gap={8}>
                                    <MenuSection title="theme" items={[
                                        {
                                            label: colorMode.colorMode === 'dark' ? "Switch to light mode" : "Switch to dark mode",
                                            icon: colorMode.colorMode === 'dark' ? <LuSun /> : <LuMoon />,
                                            onClick: colorMode.toggleColorMode
                                        }
                                    ]} />
                                    <MenuSection title="settings" items={[
                                        {
                                            label: 'Settings',
                                            icon: <LuSettings />,
                                            onClick: () => router.push('/settings')
                                        }
                                    ]} />
                                </Stack>
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