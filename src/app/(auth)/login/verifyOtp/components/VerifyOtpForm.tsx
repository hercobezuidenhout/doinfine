'use client';

import { PinInput, HStack, VStack, Button } from '@chakra-ui/react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';


interface VerifyOtpFormProps {
  redirectTo?: string;
  email: string;
}

export const VerifyOtpForm = ({ redirectTo, email }: VerifyOtpFormProps) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [otp, setOtp] = useState<string>('');
  const [verifying, setVerifying] = useState(false);

  const verifyOtp = async (otpToVerify?: string) => {
    setVerifying(true);

    const { data, error } = await supabase.auth.verifyOtp({
      email: email,
      token: otpToVerify ? otpToVerify : otp,
      type: 'magiclink'
    });

    if (error) {
      console.error(error.cause, error.stack);
      setVerifying(false);
      return;
    }

    console.info(data);

    setVerifying(false);

    router.push(redirectTo ? redirectTo : '/spaces');
  };

  const handleOtpChange = (value) => {
    setOtp(value);

    if (value.length === 6) {
      verifyOtp(value);
    }
  };

  return (
    <VStack gap={8} alignItems="stretch">
      <VStack alignItems="stretch" gap={5}>
        <HStack>
          <PinInput.Root otp handleChange={handleOtpChange} value={otp}>
            <PinInput.HiddenInput />
            <PinInput.Control>
              <PinInput.Input />
              <PinInput.Input />
              <PinInput.Input />
              <PinInput.Input />
            </PinInput.Control>
          </PinInput.Root>
        </HStack>
        <Button disabled={verifying} loading={verifying} onClick={() => verifyOtp()} size="lg" width="full">Continue</Button>
      </VStack>
    </VStack>
  );
};
