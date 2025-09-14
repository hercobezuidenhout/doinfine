'use client';

import { createClient } from "@/utils/supabase/client";
import { Stack, PinInput, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface OtpFormValues {
    otp: string;
}

interface OtpFormProps {
    email: string;
    redirectTo?: string;
}

export const OtpForm = ({ email, redirectTo }: OtpFormProps) => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { register, handleSubmit } = useForm<OtpFormValues>({
        defaultValues: {
            otp: '',
        },
    });

    const onSubmit = async ({ otp }: OtpFormValues) => {
        setLoading(true);
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

        setLoading(false);

        await fetch('/api/v1/current');

        if (redirectTo) {
            router.push(redirectTo);
        } else {
            router.push('/');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap={8} alignItems="center">
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
                <Button loading={loading} disabled={loading} type="submit" width="full">Continue</Button>
            </Stack>
        </form>
    );
};