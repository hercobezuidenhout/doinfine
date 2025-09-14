'use client';

import { HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavigationMenuItemProps {
    label: string;
    icon: React.ReactNode;
    href: string;
}

export const MainNavigationMenuItem = ({ label, icon, href }: MainNavigationMenuItemProps) => {
    const pathname = usePathname();

    const isCurrentPath = pathname === href || (href !== '/' && pathname.startsWith(href));

    return (
        <Link href={href}>
            <HStack p={2} borderRadius="md" cursor="pointer" textDecoration={isCurrentPath ? 'underline' : 'none'}>
                <Icon size="lg">
                    {icon}
                </Icon>
                <Text fontSize="xl">{label}</Text>
            </HStack>
        </Link>
    );
};