'use client';

import { EmptyState, VStack } from "@chakra-ui/react";
import { LuBadge } from "react-icons/lu";

export const ScopeRulesEmptyState = () => (
    <EmptyState.Root>
        <EmptyState.Content>
            <EmptyState.Indicator>
                <LuBadge />
            </EmptyState.Indicator>
            <VStack textAlign="center">
                <EmptyState.Title>No rules yet</EmptyState.Title>
                <EmptyState.Description>
                    Add your group&apos;s first rule
                </EmptyState.Description>
            </VStack>
        </EmptyState.Content>
    </EmptyState.Root>
);