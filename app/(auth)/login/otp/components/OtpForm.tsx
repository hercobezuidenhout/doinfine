'use client';

import { createClient } from "@/utils/supabase/client";
import { Stack, Heading, PinInput, Button } from "@chakra-ui/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface OtpFormValues {
    otp: string;
}

interface OtpFormProps {
    email: string;
}

export const OtpForm = ({ email }: OtpFormProps) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm<OtpFormValues>({
        defaultValues: {
            otp: '',
        },
    });

    const onSubmit = async ({ otp }: OtpFormValues) => {
        const supabase = createClient();

        const { error } = await supabase.auth.verifyOtp({
            email: email,
            token: otp,
            type: 'email'
        });

        if (error) {
            console.error("OTP verification error:", error);
            return;
        }

        router.push('/');
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={6}>
                <Heading size="md">An OTP has been sent to {email}</Heading>
                <PinInput.Root otp {...register('otp')}>
                    <PinInput.HiddenInput />
                    <PinInput.Control>
                        <PinInput.Input index={0} />
                        <PinInput.Input index={1} />
                        <PinInput.Input index={2} />
                        <PinInput.Input index={3} />
                        <PinInput.Input index={4} />
                        <PinInput.Input index={5} />
                    </PinInput.Control>
                </PinInput.Root>
                <Button type="submit">Continue</Button>
            </Stack>
        </form>
    );
};