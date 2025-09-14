'use client';

import { HStack, IconButton, Heading, Image } from "@chakra-ui/react";
import { LuMenu, LuUser } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const AppHeader = () => {
    const router = useRouter();

    const checkForUser = async () => {
        await fetch('/api/v1/current');
    };

    useEffect(() => {
        checkForUser();
    }, []);

    return (
        <HStack alignItems="center" justifyContent="space-between" padding={4} position="sticky" left={0} right={0} top={0} bg={{ base: "white", sm: { _dark: "black" }, md: 'transparent' }} zIndex={1000}>
            <HStack gap={4}>
                <Image src="/assets/logo.jpg" width="44px" borderRadius="full" />
                <Heading size="2xl">Doinfine</Heading>
            </HStack>
            <HStack gap={4}>
                <IconButton size="lg" borderRadius="full">
                    <LuUser />
                </IconButton>
                <IconButton size="lg" borderRadius="full">
                    <LuMenu />
                </IconButton>
            </HStack>
        </HStack>
    );
};