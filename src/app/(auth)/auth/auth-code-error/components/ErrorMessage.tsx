'use client';

import { Button, Card, CardBody, CardFooter, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { DoinfineLogo } from '@/lib/images/DoinfineLogo';

export const ErrorMessage = () => {
  const router = useRouter();

  return (
    <Flex height="85vh" alignItems="center" justifyContent="space-around">
      <Card>
        <CardBody textAlign="center">
          <VStack spacing={8}>
            <DoinfineLogo />
            <Heading>Something went wrong!</Heading>
            <Text maxWidth="md">
              We could not log you in due to an unknown error. Please try again.
              If the error persists, please reach out to support@doinfine.app.
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