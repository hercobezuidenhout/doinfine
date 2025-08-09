'use client';

import { HStack, Heading } from "@chakra-ui/react";
import { MenuButton } from "./MenuButton";

export const AppHeader = () => {
    return (
        <HStack alignItems="center" justifyContent="space-between" padding={4} position="fixed" left={0} right={0} top={0}>
            <Heading>Doinfine</Heading>
            <MenuButton />
        </HStack>
    );
};