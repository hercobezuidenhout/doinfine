'use client';

import { Blockquote, Button, CloseButton, Drawer, EmptyState, Field, Heading, HStack, IconButton, Input, Portal, Stack, VStack } from "@chakra-ui/react";
import { LuBadge, LuBadgePlus } from "react-icons/lu";

export const GuildRulesStep = () => (
    <Stack gap={4}>
        <Blockquote.Root>
            <Blockquote.Content>
                Every guild needs a code — simple, solid, and made to keep the good times rolling.
            </Blockquote.Content>
        </Blockquote.Root>
        <HStack justifyContent="space-between">
            <Heading>Guild Rules</Heading>

            <Drawer.Root placement="bottom">
                <Drawer.Trigger asChild>
                    <IconButton size="sm">
                        <LuBadgePlus />
                    </IconButton>
                </Drawer.Trigger>
                <Portal>
                    <Drawer.Backdrop />
                    <Drawer.Positioner>
                        <Drawer.Content>
                            <Drawer.Header>
                                <Drawer.Title>New Rule</Drawer.Title>
                            </Drawer.Header>
                            <Drawer.Body>
                                <Stack>
                                    <Field.Root required>
                                        <Field.Label>
                                            Rule <Field.RequiredIndicator />
                                        </Field.Label>
                                        <Input placeholder="Rule" />
                                        <Field.HelperText>e.g. Don&apos;t drop your beer</Field.HelperText>
                                    </Field.Root>
                                </Stack>
                            </Drawer.Body>
                            <Drawer.Footer>
                                <Button variant="outline">Cancel</Button>
                                <Button>Save</Button>
                            </Drawer.Footer>
                            <Drawer.CloseTrigger asChild>
                                <CloseButton size="sm" />
                            </Drawer.CloseTrigger>
                        </Drawer.Content>
                    </Drawer.Positioner>
                </Portal>
            </Drawer.Root>
        </HStack>
        <VStack>
            <EmptyState.Root>
                <EmptyState.Content>
                    <EmptyState.Indicator>
                        <LuBadge />
                    </EmptyState.Indicator>
                    <VStack textAlign="center">
                        <EmptyState.Title>No rules yet</EmptyState.Title>
                        <EmptyState.Description>
                            Add your guild&apos;s first rule
                        </EmptyState.Description>
                    </VStack>
                </EmptyState.Content>
            </EmptyState.Root>
        </VStack>
    </Stack>
);