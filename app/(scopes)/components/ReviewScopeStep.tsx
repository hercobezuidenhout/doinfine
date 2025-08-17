'use client';

import { Stack, Card, Heading, List, Button, Steps, VStack } from "@chakra-ui/react";
import { LuBadgeCheck } from "react-icons/lu";

interface ReviewScopeStepProps {
    name: string;
    description: string;
    rules: string[];
    onCreate: () => void;
}

export const ReviewScopeStep = ({ name, description, rules, onCreate }: ReviewScopeStepProps) => (
    <Stack gap={4} mt={4}>
        <Card.Root size="sm" variant="subtle">
            <Card.Header>
                <Heading>{name}</Heading>
            </Card.Header>
            <Card.Body>
                <VStack alignItems="stretch" gap={4}>
                    <VStack alignItems="stretch">
                        <Heading size="sm">Description</Heading>
                        {description}
                        {!description && (
                            "No description set. You can add one later."
                        )}
                    </VStack>
                    <VStack alignItems="stretch">
                        <Heading size="sm">Rules</Heading>
                        <List.Root gap={2} variant="plain" align="center">
                            {rules.map((rule, index) => (
                                <List.Item key={index} alignItems="start">
                                    <List.Indicator asChild>
                                        <LuBadgeCheck />
                                    </List.Indicator>
                                    {rule}
                                </List.Item>
                            ))}
                        </List.Root>
                        {rules.length === 0 && (
                            "No rules. You can create some later."
                        )}
                    </VStack>
                </VStack>
            </Card.Body>
        </Card.Root>
        <Button onClick={onCreate}>Create Group</Button>
        <Steps.PrevTrigger asChild>
            <Button variant="outline">Back</Button>
        </Steps.PrevTrigger>
    </Stack >
);