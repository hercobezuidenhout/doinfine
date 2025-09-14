'use client';

import { VStack, Heading, HStack, Icon, Text } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

interface MenuSectionProps extends PropsWithChildren {
    title: string;
    items?: {
        label: string;
        icon: React.ReactNode;
        onClick?: () => void;
    }[];
}

export const MenuSection = ({ title, items }: MenuSectionProps) => (
    <VStack alignItems="stretch" mt={8}>
        <Heading size="xs">{title.toUpperCase()}</Heading>
        <VStack alignItems="stretch">
            {items?.map((item, index) => (
                <HStack key={index} width="full" py={2} onClick={item.onClick} cursor="pointer">
                    <Icon size="md">{item.icon}</Icon>
                    <Text fontSize="md">{item.label}</Text>
                </HStack>
            ))}
        </VStack>
    </VStack>
);