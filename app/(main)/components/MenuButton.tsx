'use client';

import { useColorMode } from "@/components/ui/color-mode";
import { createClient } from "@/utils/supabase/client";
import { Blockquote, Button, CloseButton, Drawer, Heading, HStack, Icon, IconButton, Portal, Separator, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiArrowRight, FiMenu, FiMoon, FiSun } from "react-icons/fi";

export const MenuButton = () => {
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
                        <FiMenu />
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
                                    <Blockquote.Content cite="Uzumaki Naruto">
                                        You can discover more about a person in an hour of play than in a year of conversation.
                                    </Blockquote.Content>
                                    <Blockquote.Caption>
                                        — <cite>Plato</cite>
                                    </Blockquote.Caption>
                                </Blockquote.Root>

                                <VStack alignItems="stretch" mt={8}>
                                    <Heading size="xs">ACCOUNT</Heading>
                                    <VStack alignItems="stretch">
                                        <HStack width="full" justifyContent="space-between" py={3}>
                                            <Text fontSize="md">hercobez@icloud.com</Text>
                                            <Icon size="md">
                                                <FiArrowRight />
                                            </Icon>
                                        </HStack>
                                        <Separator />
                                        <HStack width="full" justifyContent="space-between" py={3} onClick={colorMode.toggleColorMode}>
                                            <Text fontSize="md">Theme</Text>
                                            <Icon size="md">
                                                {colorMode.colorMode === 'dark' ? <FiSun /> : <FiMoon />}
                                            </Icon>
                                        </HStack>
                                    </VStack>
                                </VStack>
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