'use client';

import { Button, Field, Stack, Steps, Textarea } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { PostStepProps } from "./PostStep";
import { User } from "@prisma/client";

interface SetDescriptionStepProps extends PostStepProps {
    user?: User;
    description: string;
    onDescriptionChange: (description: string) => void;
}

export const SetDescriptionStep = ({ onStepChange, user, description, onDescriptionChange }: SetDescriptionStepProps) => {
    const EYES_EMOJI = "\u{1F440}";
    const HELPER_TEXT = "e.g. Didn't show up for practice.";

    return (
        <Stack gap={4} mt={4}>
            <Field.Root required>
                <Textarea
                    value={description}
                    onChange={(event) => onDescriptionChange(event.target.value)}
                    variant="subtle"
                    size="xl"
                    autoresize
                    autoFocus={true}
                    placeholder={`${EYES_EMOJI} What did ${user?.name || 'they'} do...`} />
                <Field.HelperText>{HELPER_TEXT}</Field.HelperText>
            </Field.Root>
            <Steps.NextTrigger asChild>
                <Button onClick={() => onStepChange?.("Review post")} variant="subtle" width="fit-content" alignSelf="end">Next <FiArrowRight /></Button>
            </Steps.NextTrigger>
        </Stack>
    );
};