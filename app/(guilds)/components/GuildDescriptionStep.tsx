'use client';

import { Stack, Blockquote, Field, Input, Steps, Button, Heading } from "@chakra-ui/react";

interface GuildDescriptionStepProps {
    description: string;
    onDescriptionChange: (description: string) => void;
}

export const GuildDescriptionStep = ({ description, onDescriptionChange }: GuildDescriptionStepProps) => (
    <Stack gap={4}>
        <Heading>Group description</Heading>
        <Field.Root required>
            <Input placeholder="Choose your guild's creed" value={description} onChange={(event) => onDescriptionChange(event.target.value)} />
            <Field.HelperText>e.g. We protect the kittens of earth.</Field.HelperText>
        </Field.Root>

        <Steps.NextTrigger asChild mt={4}>
            <Button>{description.length === 0 ? 'Skip' : 'Next'}</Button>
        </Steps.NextTrigger>
        <Steps.PrevTrigger asChild>
            <Button variant="outline">Back</Button>
        </Steps.PrevTrigger>
    </Stack>
);
