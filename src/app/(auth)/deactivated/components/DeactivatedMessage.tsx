'use client';

import { Button, Card, CardBody, CardFooter, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DoinfineLogo } from '@/lib/images/DoinfineLogo';

export const DeactivatedMessage = () => {
  const router = useRouter();

  return (
    <Flex height="85vh" alignItems="center" justifyContent="space-around">
      <Card>
        <CardBody textAlign="center">
          <VStack spacing={8}>
            <DoinfineLogo />
            <Heading>Account Deactivated</Heading>
            <Text maxWidth="md">
              Your account has been deactivated.
              If this was an error please reach out to support@doinfine.app.
            </Text>
          </VStack>
        </CardBody>
        <CardFooter justifyContent="space-around">
          <Button variant="primary" width="lg" onClick={() => router.push('/')}>Back Home</Button>
        </CardFooter>
      </Card>
    </Flex>
  );
};