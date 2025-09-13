'use client';

import { Button, Stack, Steps, Text } from "@chakra-ui/react";
import { LuCheck, LuGavel, LuShieldHalf, LuUser } from "react-icons/lu";
import { SelectScopeStep } from "./SelectScopeStep";
import { SelectUserStep } from "./SelectUserStep";
import { SetDescriptionStep } from "./SetDescriptionStep";
import { useEffect, useState } from "react";
import { Scope, User } from "@prisma/client";
import { useCreateFineMutation } from "@/mutations/useCreateFineMutation";

interface PostStepperProps {
    onStepChange?: (stepTitle: string) => void;
    onDone?: () => void;
}

export const PostStepper = ({ onDone, ...rest }: PostStepperProps) => {
    const { mutateAsync, isPending } = useCreateFineMutation();
    const [selectedGroup, setSelectedGroup] = useState<Scope>();
    const [selectedUser, setSelectedUser] = useState<User>();
    const [description, setDescription] = useState("");

    const steps = [
        {
            icon: <LuShieldHalf />,
            component: <SelectScopeStep {...rest} onGroupSelect={setSelectedGroup} />
        },
        {
            icon: <LuUser />,
            component: selectedGroup && <SelectUserStep {...rest} scopeId={selectedGroup?.id} onUserSelect={setSelectedUser} />,
        },
        {
            icon: <LuGavel />,
            component: <SetDescriptionStep {...rest} user={selectedUser} description={description} onDescriptionChange={setDescription} />,
        },
    ];

    useEffect(() => {
        console.info("Selected group changed:", selectedGroup);
    }, [selectedGroup]);

    const handleCreatePost = async () => {
        await mutateAsync({
            description,
            issuedToId: selectedUser!.id,
            scopeId: selectedGroup!.id
        });
        onDone?.();
    };

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
                    <Text>Are you sure you want to fine <b>{selectedUser?.name}</b> in <b>{selectedGroup?.name}</b> for:</Text>
                    <Text>{description}</Text>
                    <Button mt={4} onClick={handleCreatePost} disabled={isPending} loading={isPending}>Full send!</Button>
                </Stack>
            </Steps.CompletedContent>
        </Steps.Root>
    );
};