'use client';

import { Button, Stack, Steps, Text } from "@chakra-ui/react";
import { FiEye, FiUser, FiPenTool } from "react-icons/fi";
import { LuCheck } from "react-icons/lu";
import { SelectGroupStep } from "./SelectGroupStep";
import { SelectUserStep } from "./SelectUserStep";
import { SetDescriptionStep } from "./SetDescriptionStep";
import { useEffect, useState } from "react";
import { Scope } from "@prisma/client";

interface PostStepperProps {
    onStepChange?: (stepTitle: string) => void;
    onDone?: () => void;
}

export const PostStepper = ({ onDone, ...rest }: PostStepperProps) => {
    const [selectedGroup, setSelectedGroup] = useState<Scope | null>(null);

    const steps = [
        {
            icon: <FiEye />,
            component: <SelectGroupStep {...rest} onGroupSelect={setSelectedGroup} />
        },
        {
            icon: <FiUser />,
            component: <SelectUserStep {...rest} />,
        },
        {
            icon: <FiPenTool />,
            component: <SetDescriptionStep {...rest} />,
        },
    ];

    useEffect(() => {
        console.info("Selected group changed:", selectedGroup);
    }, [selectedGroup]);

    return (
        <Steps.Root defaultStep={0} count={steps.length} size="xs">
            <Steps.List>
                {steps.map((step, index) => (
                    <Steps.PrevTrigger key={index} asChild>
                        <Steps.Item index={index}>
                            <Steps.Indicator>
                                <Steps.Status incomplete={step.icon} complete={<LuCheck />} />
                            </Steps.Indicator>
                            <Steps.Separator />
                        </Steps.Item>
                    </Steps.PrevTrigger>
                ))}
            </Steps.List>

            {steps.map((step, index) => (
                <Steps.Content key={index} index={index}>
                    {step.component}
                </Steps.Content>
            ))}
            <Steps.CompletedContent>
                <Stack gap={4} mt={4}>
                    <Text>Are you sure you want to fine <b>Billy Anderson</b> in <b>Braai Maatjies</b> for:</Text>
                    <Text>Spilling his beer!</Text>
                    <Button mt={4} onClick={onDone}>Full send!</Button>
                </Stack>
            </Steps.CompletedContent>
        </Steps.Root>
    );
};