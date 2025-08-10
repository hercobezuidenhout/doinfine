'use client';

import { Stack, Blockquote, Field, Input } from "@chakra-ui/react";

interface GuildNameStepProps {
    name: string;
    onNameChange: (name: string) => void;
}

export const GuildNameStep = ({ name, onNameChange }: GuildNameStepProps) => (
    <Stack gap={4}>
        <Blockquote.Root>
            <Blockquote.Content>
                Every legend starts with a guild… now yours begins.
            </Blockquote.Content>
        </Blockquote.Root>
        <Field.Root required gap={2}>
            <Field.Label>
                Guild name <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Choose your guild's name" value={name} onChange={(event) => onNameChange(event.target.value)} />
            <Field.HelperText>e.g. Pink Fluffy Kittens</Field.HelperText>
        </Field.Root>
    </Stack>
);