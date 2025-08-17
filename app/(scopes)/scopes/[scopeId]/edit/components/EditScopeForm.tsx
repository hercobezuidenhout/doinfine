'use client';

import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { Scope } from "@prisma/client";
import { useState } from "react";

interface EditScopeFormProps {
    scope: Pick<Scope, 'id' | 'name' | 'description'>;
}

export const EditScopeForm = ({ scope }: EditScopeFormProps) => {
    const [name, setName] = useState(scope.name || '');
    const [description, setDescription] = useState(scope.description || '');

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
                <Button>Save</Button>
            </Stack>
        </Stack>
    );
};