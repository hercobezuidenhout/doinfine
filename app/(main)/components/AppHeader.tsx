'use client';

import { HStack, IconButton, Heading } from "@chakra-ui/react";
import { MenuDrawer } from "./MenuDrawer";
import { LuShieldHalf } from "react-icons/lu";
import { useRouter } from "next/navigation";

export const AppHeader = () => {
    const router = useRouter();

    return (
        <HStack alignItems="center" justifyContent="space-between" padding={4} position="fixed" left={0} right={0} top={0} bg={{ base: "white", _dark: "black" }} zIndex={1000}>
            <MenuDrawer />
            <Heading size="lg" textTransform="uppercase">Doinfine</Heading>
            <IconButton variant="ghost" onClick={() => router.push("/scopes")} aria-label="Groups">
                <LuShieldHalf />
            </IconButton>
        </HStack>
    );
};