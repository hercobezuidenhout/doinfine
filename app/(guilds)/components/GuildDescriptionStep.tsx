'use client';

import { Stack, Blockquote, Field, Input } from "@chakra-ui/react";

interface GuildDescriptionStepProps {
    description: string;
    onDescriptionChange: (description: string) => void;
}

export const GuildDescriptionStep = ({ description, onDescriptionChange }: GuildDescriptionStepProps) => (
    <Stack gap={4}>
        <Blockquote.Root>
            <Blockquote.Content>
                A motto sets the tone for the crew — clear, catchy, and easy to remember.
            </Blockquote.Content>
        </Blockquote.Root>
        <Field.Root required gap={2}>
            <Field.Label>
                Guild creed <Field.RequiredIndicator />
            </Field.Label>
            <Input placeholder="Choose your guild's creed" value={description} onChange={(event) => onDescriptionChange(event.target.value)} />
            <Field.HelperText>e.g. We march with paws of silk and claws of steel, purring in peace until the moment to strike.</Field.HelperText>
        </Field.Root>
    </Stack>
);
