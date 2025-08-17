import { VStack, HStack, Icon, Heading } from "@chakra-ui/react";
import { LuShieldHalf } from "react-icons/lu";
import { BackButton } from "./BackButton";
import { CreateScopeDrawer } from "./CreateScopeDrawer";
import { ScopeMenuDrawer } from "./ScopeMenuDrawer";

interface ScopeHeaderProps {
    title?: string;
    scopeId?: number;
}

const DEFAULT_TITLE = 'Groups';

export const ScopeHeader = ({ title = DEFAULT_TITLE, scopeId }: ScopeHeaderProps) => (
    <VStack alignItems="start" width="full">
        <BackButton />
        <HStack justifyContent="space-between" width="full">
            <HStack>
                <Icon size="lg"><LuShieldHalf /></Icon>
                <Heading size="2xl">{title}</Heading>
            </HStack>
            {title === DEFAULT_TITLE && <CreateScopeDrawer />}
            {scopeId && <ScopeMenuDrawer scopeId={scopeId} />}
        </HStack>
    </VStack>
);