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
}

const DEFAULT_TITLE = 'Groups';

export const ScopeHeader = ({ title = DEFAULT_TITLE, scopeId, icon }: ScopeHeaderProps) => (
    <VStack alignItems="start" width="full">
        <BackButton />
        <HStack justifyContent="space-between" width="full">
            <HStack>
                {!scopeId && (
                    <Icon size="lg">
                        {icon ? icon : <LuUsers />}
                    </Icon>
                )}
                <Heading size="2xl">{title}</Heading>
            </HStack>
            {title === DEFAULT_TITLE && <CreateScopeDrawer />}
            {scopeId && <ScopeMenuDrawer scopeId={scopeId} />}
        </HStack>
    </VStack>
);