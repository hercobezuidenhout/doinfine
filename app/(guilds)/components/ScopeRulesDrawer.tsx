'use client';

import { Drawer, IconButton, Portal, Stack, Field, Input, Button, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { LuBadgePlus } from "react-icons/lu";

interface ScopeRulesDrawerProps {
    onAddRule: (rule: string) => void;
}

export const ScopeRulesDrawer = ({ onAddRule }: ScopeRulesDrawerProps) => {
    const [rule, setRule] = useState('');

    const handleAddRule = () => {
        onAddRule(rule);
        setRule('');
    };

    return (
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
                                    <Input placeholder="Rule" value={rule} onChange={(event) => setRule(event.target.value)} />
                                    <Field.HelperText>e.g. Always save a kitten from a tree</Field.HelperText>
                                </Field.Root>
                            </Stack>
                        </Drawer.Body>
                        <Drawer.Footer>
                            <Button onClick={handleAddRule}>Save</Button>
                        </Drawer.Footer>
                        <Drawer.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Drawer.CloseTrigger>
                    </Drawer.Content>
                </Drawer.Positioner>
            </Portal>
        </Drawer.Root>
    );
};