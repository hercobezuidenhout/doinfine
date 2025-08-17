'use client';

import { Steps } from "@chakra-ui/react";
import { LuCheck, LuDot } from "react-icons/lu";
import { ScopeNameStep } from "./ScopeNameStep";
import { ScopeDescriptionStep } from "./ScopeDescriptionStep";
import { ReviewScopeStep } from "./ReviewScopeStep";
import { useState } from "react";
import { ScopeRulesStep } from "./ScopeRulesStep";

export const CreateScopeSteps = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [rules, setRules] = useState<string[]>([]);

    const steps = [
        {
            icon: <LuDot />,
            description: <ScopeNameStep name={name} onNameChange={setName} />
        },
        {
            icon: <LuDot />,
            description: <ScopeDescriptionStep description={description} onDescriptionChange={setDescription} />
        },
        {
            icon: <LuDot />,
            description: <ScopeRulesStep rules={rules} onAdd={(newRule) => setRules([...rules, newRule])} onRemove={(oldRule) => setRules(rules.filter(rule => rule !== oldRule))} />,
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
                <ReviewScopeStep name={name} description={description} rules={rules} onCreate={handleCreate} />
            </Steps.CompletedContent>
        </Steps.Root >
    );
};