'use client';

import { useUpdateMeMutation } from "@/mutations/useUpdateMeMutation";
import { Button, Field, Input, Stack, Textarea } from "@chakra-ui/react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface EditProfileFormProps {
    user: Pick<User, 'id' | 'name' | 'aboutMe'>;
}

export const EditProfileForm = ({ user }: EditProfileFormProps) => {
    const router = useRouter();
    const { mutateAsync, isPending } = useUpdateMeMutation();
    const [name, setName] = useState(user.name || '');
    const [aboutMe, setAboutMe] = useState(user.aboutMe || '');

    const handleUpdate = async () => {
        await mutateAsync({
            name,
            aboutMe
        });

        router.push(`/me`);
    };

    return (
        <Stack gap={4}>
            <Field.Root required>
                <Field.Label>
                    Name <Field.RequiredIndicator />
                </Field.Label>
                <Input placeholder=".e.g John Doe" variant="subtle" value={name} onChange={(event) => setName(event.target.value)} />
            </Field.Root>
            <Field.Root required>
                <Field.Label>
                    Description
                </Field.Label>
                <Textarea resize="none" autoresize placeholder="e.g. I live in a cool cave with stuff" variant="subtle" value={aboutMe} onChange={(event) => setAboutMe(event.target.value)} />
            </Field.Root>

            <Stack>
                <Button loading={isPending} disabled={isPending} onClick={handleUpdate}>Save</Button>
            </Stack>
        </Stack>
    );
};