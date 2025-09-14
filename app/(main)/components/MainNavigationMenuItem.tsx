import { HStack, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";

interface MainNavigationMenuItemProps {
    label: string;
    icon: React.ReactNode;
    href: string;
}

export const MainNavigationMenuItem = ({ label, icon, ...rest }: MainNavigationMenuItemProps) => (
    <Link {...rest}>
        <HStack p={2} borderRadius="md" cursor="pointer">
            <Icon size="lg">
                {icon}
            </Icon>
            <Text fontSize="xl">{label}</Text>
        </HStack>
    </Link>
);