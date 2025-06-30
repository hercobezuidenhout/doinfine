import { Heading, Text, VStack } from '@chakra-ui/react';
import { CallToActionButtons } from './CallToActionButtons';

export const GetStartedSection = () => {
  return (
    <VStack spacing={8} align="center" my={10}>
      <Heading size="2xl">
        Ready to get started?
      </Heading>
      <Text>
        Teams in all industries—from Software development to Marketing—use
        Doinfine to build culture and drive engagement
      </Text>
      <CallToActionButtons />
    </VStack>
  );
};
