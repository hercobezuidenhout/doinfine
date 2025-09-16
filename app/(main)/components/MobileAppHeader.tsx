'use client';

import { Box, Heading, HStack, Image } from "@chakra-ui/react";
import { MenuDrawer } from "./MenuDrawer";

export const MobileAppHeader = () => {
    return (
        <HStack justifyContent="space-between" py={2} px={4} position="sticky" top={0}>
            <Box>
                <Image src="/assets/logo.jpg" width="35px" borderRadius="full" alt="Doinfine logo" />
            </Box >
            <Box>
                <Heading>Doinfine</Heading>
            </Box>
            <Box>
                <MenuDrawer />
            </Box>
        </HStack >
    );
};