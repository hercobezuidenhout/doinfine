'use client';

import { Blockquote, Button, Card, CloseButton, Drawer, EmptyState, Field, Heading, HStack, IconButton, Input, Portal, Stack, VStack } from "@chakra-ui/react";
import { LuBadge, LuBadgePlus } from "react-icons/lu";
import { ScopeRulesEmptyState } from "./ScopeRulesEmptyState";
import { ScopeRulesDrawer } from "./ScopeRulesDrawer";

interface GuildRulesStepProps {
    rules: string[];
    onAdd: (rule: string) => void;
    onRemove: (rule: string) => void;
}

export const GuildRulesStep = ({ rules, onAdd, onRemove }: GuildRulesStepProps) => (
    <Stack gap={4}>
        <Blockquote.Root>
            <Blockquote.Content>
                Every guild needs a code — simple, solid, and made to keep the good times rolling.
            </Blockquote.Content>
        </Blockquote.Root>
        <HStack justifyContent="space-between">
            <Heading>Guild Rules</Heading>

            <ScopeRulesDrawer onAddRule={onAdd} />
        </HStack>
        <VStack>
            {rules.map((rule, index) => (
                <Card.Root key={index} width="full">
                    <Card.Body>
                        <HStack justifyContent="space-between">
                            <Card.Title>{rule}</Card.Title>
                            <CloseButton onClick={() => onRemove(rule)} size="sm" />
                        </HStack>
                    </Card.Body>
                </Card.Root>
            ))}
            {rules.length <= 0 && <ScopeRulesEmptyState />}
        </VStack>
    </Stack>
);