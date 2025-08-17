'use client';

import { Button, Card, CloseButton, Heading, HStack, Stack, Steps, VStack } from "@chakra-ui/react";
import { ScopeRulesEmptyState } from "./ScopeRulesEmptyState";
import { ScopeRulesDrawer } from "./ScopeRulesDrawer";

interface GuildRulesStepProps {
    rules: string[];
    onAdd: (rule: string) => void;
    onRemove: (rule: string) => void;
}

export const GuildRulesStep = ({ rules, onAdd, onRemove }: GuildRulesStepProps) => (
    <Stack gap={4}>
        <HStack justifyContent="space-between">
            <Heading>Guild Rules</Heading>

            {rules.length < 4 && <ScopeRulesDrawer onAddRule={onAdd} />}
        </HStack>
        <VStack>
            {rules.map((rule, index) => (
                <Card.Root key={index} width="full">
                    <Card.Body>
                        <HStack justifyContent="space-between">
                            <Heading size="sm">{rule}</Heading>
                            <CloseButton onClick={() => onRemove(rule)} size="sm" />
                        </HStack>
                    </Card.Body>
                </Card.Root>
            ))}
            {rules.length <= 0 && <ScopeRulesEmptyState />}
        </VStack>
        <Steps.NextTrigger asChild>
            <Button>{rules.length === 0 ? 'Skip' : 'Next'}</Button>
        </Steps.NextTrigger>
        <Steps.PrevTrigger asChild>
            <Button variant="outline">Back</Button>
        </Steps.PrevTrigger>
    </Stack>
);