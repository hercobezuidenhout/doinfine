import { Button, HStack, Link } from '@chakra-ui/react';

export const CallToActionButtons = () => {
  return (
    <HStack spacing={4}>
      <Link href="/signup" variant="unstyled">
        <Button size="xl" colorScheme="primary">
          Get Started
        </Button>
      </Link>
    </HStack>
  );
};
