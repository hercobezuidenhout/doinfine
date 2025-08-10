'use client';

import { Steps, ButtonGroup, Button } from "@chakra-ui/react";
import { LuArrowLeft, LuCheck, LuDot } from "react-icons/lu";
import { GuildNameStep } from "./GuildNameStep";
import { GuildDescriptionStep } from "./GuildDescriptionStep";
import { ReviewGuildStep } from "./ReviewGuildStep";
import { useState } from "react";
import { GuildRulesStep } from "./GuildRulesStep";

export const CreateGuildSteps = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const steps = [
        {
            icon: <LuDot />,
            description: <GuildNameStep name={name} onNameChange={setName} />
        },
        {
            icon: <LuDot />,
            description: <GuildDescriptionStep description={description} onDescriptionChange={setDescription} />
        },
        {
            icon: <LuDot />,
            description: <GuildRulesStep />,
        },
    ];

    return (
        <Steps.Root defaultStep={0} count={steps.length} size="xs">
            <Steps.List>
                {steps.map((step, index) => (
                    <Steps.Item key={index} index={index}>
                        <Steps.Indicator>
                            <Steps.Status incomplete={step.icon} complete={<LuCheck />} />
                        </Steps.Indicator>
                        <Steps.Separator />
                    </Steps.Item>
                ))}
            </Steps.List>

            {steps.map((step, index) => (
                <Steps.Content key={index} index={index} py={4}>
                    {step.description}
                </Steps.Content>
            ))}

            <Steps.CompletedContent>
                <ReviewGuildStep />
            </Steps.CompletedContent>

            <ButtonGroup size="sm" justifyContent="end">
                <Steps.PrevTrigger asChild>
                    <Button variant="ghost">
                        <LuArrowLeft /> Back
                    </Button>
                </Steps.PrevTrigger>
                <Steps.NextTrigger asChild>
                    <Button>Next</Button>
                </Steps.NextTrigger>
            </ButtonGroup>
        </Steps.Root >
    );
};