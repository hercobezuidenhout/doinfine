import { VStack, HStack, Icon, Heading } from "@chakra-ui/react";
import { LuUsers } from "react-icons/lu";
import { BackButton } from "./BackButton";
import { CreateScopeDrawer } from "./CreateScopeDrawer";
import { ScopeMenuDrawer } from "./ScopeMenuDrawer";
import React from "react";

interface ScopeHeaderProps {
    title?: string;
    scopeId?: number;
    icon?: React.ReactNode;
    href?: string;
}

const DEFAULT_TITLE = 'Groups';

export const ScopeHeader = ({ title = DEFAULT_TITLE, scopeId, href = '/' }: ScopeHeaderProps) => (
    <VStack alignItems="start" width="full">
        <BackButton href={href} />
        <HStack justifyContent="space-between" width="full">
            <HStack>
                <Heading size="5xl">{title}</Heading>
            </HStack>
            {title === DEFAULT_TITLE && <CreateScopeDrawer />}
            {scopeId && <ScopeMenuDrawer scopeId={scopeId} />}
        </HStack>
    </VStack>
);