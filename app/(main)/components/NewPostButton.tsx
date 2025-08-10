'use client';

import { Box } from "@chakra-ui/react";
import { PostDrawer } from "./PostDrawer";

export const NewPostButton = () => {
    return (
        <Box position="fixed" bottom={0} left={0} right={0} p={4} bg={{ base: 'white', _dark: 'black' }}>
            <PostDrawer />
        </Box>
    );
};