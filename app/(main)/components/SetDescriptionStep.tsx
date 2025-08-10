'use client';

import { Button, Stack, Steps, Textarea } from "@chakra-ui/react";
import { FiArrowRight } from "react-icons/fi";
import { PostStepProps } from "./PostStep";

export const SetDescriptionStep = ({ onStepChange }: PostStepProps) => {
    return (
        <Stack gap={4} mt={4}>
            <Textarea autoresize autoFocus={true} />
            <Steps.NextTrigger asChild>
                <Button onClick={() => onStepChange?.("Review post")} variant="subtle" width="fit-content" alignSelf="end">Next <FiArrowRight /></Button>
            </Steps.NextTrigger>
        </Stack>
    );
};