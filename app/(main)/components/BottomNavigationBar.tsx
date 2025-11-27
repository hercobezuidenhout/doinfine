'use client';

import { HStack, IconButton } from "@chakra-ui/react";
import { LuHouse, LuUser, LuUsers } from "react-icons/lu";
import { PostDrawer } from "./PostDrawer";
import { usePathname, useRouter } from "next/navigation";
import { NotificationsDrawer } from "@/app/(main)/components/NotificationsDrawer";

export const BottomNavigationBar = () => {
    const pathname = usePathname();
    const router = useRouter();

    const isCurrentPath = (href: string) => pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <HStack justifyContent="space-between" position="fixed" bottom={0} left={0} right={0} py={4} px={8} bg="bg.subtle">
            <IconButton onClick={() => router.push('/')} borderRadius="full" variant={isCurrentPath("/") ? 'solid' : 'ghost'}>
                <LuHouse />
            </IconButton>
            <IconButton onClick={() => router.push('/scopes')} borderRadius="full" variant={isCurrentPath("/scopes") ? 'solid' : 'ghost'}>
                <LuUsers />
            </IconButton>
            <PostDrawer />
            <NotificationsDrawer />
            <IconButton onClick={() => router.push('/me')} borderRadius="full" variant={isCurrentPath("/me") ? 'solid' : 'ghost'}>
                <LuUser />
            </IconButton>
        </HStack>
    );
};