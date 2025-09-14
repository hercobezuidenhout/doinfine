'use client'

import { HStack, IconButton } from "@chakra-ui/react"
import { LuDollarSign, LuHouse, LuUsers } from "react-icons/lu"

export const BottomNavigationBar = () => {
    return (
        <HStack justifyContent="space-between" position="fixed" bottom={0} left={0} right={0} py={4} px={8} bg="bg.subtle">
            <IconButton variant="ghost">
                <LuHouse />
            </IconButton>
            <IconButton variant="ghost">
                <LuDollarSign />
            </IconButton>
            <IconButton variant="ghost">
                <LuUsers />
            </IconButton>
        </HStack>
    )
}