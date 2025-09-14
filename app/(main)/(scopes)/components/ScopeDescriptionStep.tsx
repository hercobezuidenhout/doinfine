'use client';

import { Stack, Field, Input, Steps, Button, Heading } from "@chakra-ui/react";

interface ScopeDescriptionStepProps {
    description: string;
    onDescriptionChange: (description: string) => void;
}

export const ScopeDescriptionStep = ({ description, onDescriptionChange }: ScopeDescriptionStepProps) => (
    <Stack gap={4}>
        <Heading>Group description</Heading>
        <Field.Root required>
            <Input placeholder="What is your group about?" value={description} onChange={(event) => onDescriptionChange(event.target.value)} />
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
