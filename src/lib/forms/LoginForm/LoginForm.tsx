'use client';

import { VStack, Flex, Link, Text } from '@chakra-ui/react';
import { OtpLogin } from './OtpLogin';

interface LoginFormProps {
  redirectTo?: string;
  signup?: boolean;
  width?: string;
}

export const LoginForm = ({ redirectTo = '/', signup, width }: LoginFormProps) => {
  return (
    <>
      <VStack gap={8} alignItems="stretch">
        <VStack gap={5} alignItems="stretch">
          <OtpLogin width={width} redirectTo={redirectTo} />
        </VStack>
      </VStack>
      <Flex justify="space-around">
        {signup ? (
          <Text>Already have an account? <Link href="/login" fontWeight="bold">Login</Link></Text>
        ) : (
          <Text>Don&apos;t have an account? <Link href="/signup" fontWeight="bold">Sign Up</Link></Text>
        )}
      </Flex>
    </>
  );
};
