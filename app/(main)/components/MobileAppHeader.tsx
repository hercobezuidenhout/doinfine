'use client'

import { Box, Heading, HStack, IconButton, Image } from "@chakra-ui/react"
import { LuMenu } from "react-icons/lu"

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
                <IconButton variant="ghost">
                    <LuMenu />
                </IconButton>
            </Box>
        </HStack >
    )
}