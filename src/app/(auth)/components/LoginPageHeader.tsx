'use client';

import { DoinfineLogo } from '@/lib/images/DoinfineLogo';
import { Heading, Text, VStack } from '@chakra-ui/react';

interface LoginPageHeaderProps {
  signup?: boolean;
}

export const LoginPageHeader = ({ signup }: LoginPageHeaderProps) => (
  <VStack spacing={3}>
    <DoinfineLogo />
    <Heading as="h1" size="xl">
      {signup ? 'Get Started with Doinfine' : 'Log in to Doinfine'}
    </Heading>
    <Text>
      {signup ? 'Sign in to create an account.' : 'Please log in to your account.'}
    </Text>
  </VStack>
);