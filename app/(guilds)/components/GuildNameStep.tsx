'use client';

import { Stack, Field, Input, Button, Steps, Heading } from "@chakra-ui/react";

interface GuildNameStepProps {
    name: string;
    onNameChange: (name: string) => void;
}

export const GuildNameStep = ({ name, onNameChange }: GuildNameStepProps) => (
    <Stack gap={4}>
        <Heading>Group name</Heading>
        <Field.Root required gap={2}>
            <Input placeholder="Choose your guild's name" value={name} onChange={(event) => onNameChange(event.target.value)} />
            <Field.HelperText>e.g. Pink Fluffy Kittens</Field.HelperText>
        </Field.Root>
        {name.length > 0 && (
            <Steps.NextTrigger asChild>
                <Button>Next</Button>
            </Steps.NextTrigger>
        )}
    </Stack>
);