'use client';

import { Button, Field, Stack, Steps, Textarea } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { PostStepProps } from "./PostStep";
import { User } from "@prisma/client";
import { useState } from "react";

interface SetDescriptionStepProps extends PostStepProps {
    user?: User;
    description: string;
    onDescriptionChange: (description: string) => void;
}

export const SetDescriptionStep = ({ onStepChange, user, description, onDescriptionChange }: SetDescriptionStepProps) => {
    const eyesEmoji = "\u{1F440}";

    return (
        <Stack gap={4} mt={4}>
            <Field.Root required>
                <Textarea value={description} onChange={(event) => onDescriptionChange(event.target.value)} variant="subtle" size="xl" autoresize autoFocus={true} placeholder={`${eyesEmoji} What did ${user?.name || 'they'} do...`} />
                <Field.HelperText>e.g. Didn't show up for practise.</Field.HelperText>
            </Field.Root>
            <Steps.NextTrigger asChild>
                <Button onClick={() => onStepChange?.("Review post")} variant="subtle" width="fit-content" alignSelf="end">Next <FiArrowRight /></Button>
            </Steps.NextTrigger>
        </Stack>
    );
};