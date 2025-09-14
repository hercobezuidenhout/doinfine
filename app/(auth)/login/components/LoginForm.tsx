'use client';

import { Stack, Field, Input, Button } from "@chakra-ui/react";
import { set, useForm } from "react-hook-form";
import { createClient } from '@/utils/supabase/client';
import { useRouter } from "next/navigation";
import { useState } from "react";

interface LoginFormValues {
    email: string;
}

interface LoginFormProps {
    redirectTo?: string;
}

export const LoginForm = ({ redirectTo }: LoginFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
        defaultValues: {
            email: process.env.NODE_ENV === 'development' ? 'dev@example.com' : '',
        },
    });

    const onSubmit = async (formData: LoginFormValues) => {
        setLoading(true);
        console.info("Form submitted with data:", formData);

        const supabase = createClient();

        if (process.env.NODE_ENV === 'development') {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: formData.email,
                password: 'supersecret'
            });

            if (error) {
                console.info("Login error:", error);
                return;
            }

            if (data) console.info("Login data:", data);

            setLoading(false);

            router.push(redirectTo || '/');

            return;
        }

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

        setLoading(false);

        if (redirectTo) {
            router.push(`/login/otp?email=${encodeURIComponent(formData.email)}&redirectTo=${encodeURIComponent(redirectTo)}`);
        } else {
            router.push(`/login/otp?email=${encodeURIComponent(formData.email)}`);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={6}>
                <Field.Root>
                    <Input {...register('email')} type="email" placeholder="Enter your email" px={2} />
                    <Field.ErrorText>
                        {errors.email && <span>{errors.email.message}</span>}
                    </Field.ErrorText>
                </Field.Root>
                <Button disabled={loading} loading={loading} type="submit" width="full">Login</Button>
            </Stack>
        </form>
    );
};
