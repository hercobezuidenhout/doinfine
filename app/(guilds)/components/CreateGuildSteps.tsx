'use client';

import { Steps } from "@chakra-ui/react";
import { LuCheck, LuDot } from "react-icons/lu";
import { GuildNameStep } from "./GuildNameStep";
import { GuildDescriptionStep } from "./GuildDescriptionStep";
import { ReviewGuildStep } from "./ReviewGuildStep";
import { useState } from "react";
import { GuildRulesStep } from "./GuildRulesStep";

export const CreateGuildSteps = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState<string[]>([]);

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
            description: <GuildRulesStep rules={rules} onAdd={(newRule) => setRules([...rules, newRule])} onRemove={(oldRule) => setRules(rules.filter(rule => rule !== oldRule))} />,
        },
    ];

    const handleCreate = () => {
        console.log("Guild created with the following details:");
        console.log("Name:", name);
        console.log("Description:", description);
        console.log("Rules:", rules);
    };

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
                <ReviewGuildStep name={name} description={description} rules={rules} onCreate={handleCreate} />
            </Steps.CompletedContent>
        </Steps.Root >
    );
};