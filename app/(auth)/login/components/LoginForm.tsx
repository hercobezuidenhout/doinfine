'use client';

import { Stack, Heading, Field, Input, Button } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from "next/navigation";

interface LoginFormValues {
    email: string;
}

export const LoginForm = () => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        defaultValues: {
            email: process.env.NODE_ENV === 'development' ? 'dev@example.com' : '',
        },
    });

    const onSubmit = async (formData: LoginFormValues) => {
        console.info("Form submitted with data:", formData);

        const supabase = createClient();
        const { error } = await supabase.auth.signInWithOtp({
            email: formData.email,
            options: {
                shouldCreateUser: false
            }
        });

        if (error) {
            console.error("Login error:", error);
            return;
        }

        router.push(`/login/otp?email=${encodeURIComponent(formData.email)}`);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={6}>
                <Heading size="md">Login</Heading>
                <Field.Root>
                    <Input {...register('email')} type="email" placeholder="Enter your email" px={2} />
                    <Field.ErrorText>
                        {errors.email && <span>{errors.email.message}</span>}
                    </Field.ErrorText>
                </Field.Root>
                <Button type="submit">Login</Button>
            </Stack>
        </form>
    );
};
