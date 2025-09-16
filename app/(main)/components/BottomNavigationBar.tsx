'use client'

import { HStack, IconButton, Link } from "@chakra-ui/react"
import { LuHouse, LuUsers } from "react-icons/lu"
import { PostDrawer } from "./PostDrawer"
import { usePathname } from "next/navigation"
import {NotificationsDrawer} from "@/app/(main)/components/NotificationsDrawer";

export const BottomNavigationBar = () => {
    const pathname = usePathname()

    const isCurrentPath = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href))

    return (
        <HStack justifyContent="space-between" position="fixed" bottom={0} left={0} right={0} py={4} px={8} bg="bg.subtle">
            <Link href="/">
                <IconButton borderRadius="full" variant={isCurrentPath("/") ? 'solid' : 'ghost'}>
                    <LuHouse />
                </IconButton>
            </Link>
            <PostDrawer />
            <Link href="/scopes">
                <IconButton borderRadius="full" variant={isCurrentPath("/scopes") ? 'solid' : 'ghost'}>
                    <LuUsers />
                </IconButton>
            </Link>
            <NotificationsDrawer />
        </HStack>
    )
}