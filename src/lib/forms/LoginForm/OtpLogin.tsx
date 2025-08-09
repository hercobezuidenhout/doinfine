'use client';

import { Button, Field, Input, VStack } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

type OtpLoginFormData = {
  email: string;
};

interface OtpLoginProps {
  redirectTo?: string;
  width?: string;
}

export const OtpLogin = ({ redirectTo }: OtpLoginProps) => {
  const supabase = useSupabaseClient();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<OtpLoginFormData>();
  const email = watch('email');
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async () => {
    const response = await fetch(`/auth/deactivated?email=${email}`);
    const isDeactivated = await response.json();

    if (isDeactivated) {
      router.push('/deactivated');
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.signInWithOtp({ email: email });

    if (error) {
      return;
    }

    setIsLoading(false);

    const verifyUrl = redirectTo ? `/login/verifyOtp?email=${email}&redirectTo=${redirectTo}` : `/login/verifyOtp?email=${email}`;

    router.push(verifyUrl);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, () => setIsLoading(false))}>
      <VStack align="stretch" gap={5}>
        <Field.Root invalid={!!errors.email}>
          <Input {...register("email")} />
        </Field.Root>
        <Button size="lg" width="full" type="submit" loading={isLoading}>
          Continue
        </Button>
      </VStack>
    </form>
  );
};