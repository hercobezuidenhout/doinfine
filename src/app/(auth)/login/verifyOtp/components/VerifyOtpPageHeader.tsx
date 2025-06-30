'use client';

import { DoinfineLogo } from '@/lib/images/DoinfineLogo';
import { Heading, Text, VStack } from '@chakra-ui/react';

export const VerifyOtpPageHeader = () => (
  <VStack spacing={3}>
    <DoinfineLogo />
    <Heading as="h1" size="xl">
      Verify OTP
    </Heading>
    <Text>An OTP has been sent to your email.</Text>
  </VStack>
);