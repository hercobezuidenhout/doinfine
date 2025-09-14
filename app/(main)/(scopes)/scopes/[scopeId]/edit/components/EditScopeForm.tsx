'use client';

import { useUpdateScopeMutation } from "@/mutations/useUpdateScopeMutation";
import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { Scope } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditScopeFormProps {
    scope: Pick<Scope, 'id' | 'name' | 'description'>;
}

export const EditScopeForm = ({ scope }: EditScopeFormProps) => {
    const router = useRouter();
    const { mutateAsync, isPending } = useUpdateScopeMutation(scope.id);
    const [name, setName] = useState(scope.name || '');
    const [description, setDescription] = useState(scope.description || '');

    const handleUpdate = async () => {
        await mutateAsync({
            name,
            description
        });

        router.push(`/scopes/${scope.id}`);
    };

    return (
        <Stack gap={4}>
            <Field.Root required>
                <Field.Label>
                    Name <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder="What is your group's name?" variant="subtle" value={name} onChange={(event) => setName(event.target.value)} />
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Description
                </Field.Label>
                <Textarea resize="none" autoresize placeholder="What is your group about?" variant="subtle" value={description} onChange={(event) => setDescription(event.target.value)} />
            </Field.Root>

            <Stack>
                <Button loading={isPending} disabled={isPending} onClick={handleUpdate}>Save</Button>
            </Stack>
        </Stack>
    );
};