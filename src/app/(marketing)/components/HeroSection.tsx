import { Heading, Image, Text, VStack } from '@chakra-ui/react';
import { CallToActionButtons } from './CallToActionButtons';

export const HeroSection = () => {
  return (
    <VStack>
      <VStack gap={{ base: 2, md: 8 }} my={{ base: 10, md: 20 }} textAlign="center">
        <Heading size="2xl">
          Create a team charter for your team
        </Heading>
        <Text fontSize="2xl">
          Over 70+ teams have used Doinfine to build a stronger team culture - and its 100% free.
        </Text>
        <CallToActionButtons />
      </VStack>
      <Image display={{ base: 'none', md: 'block' }} src='assets/marketing/doinfine-homepage.png' />
      <Image mt={-20} mb={-20} display={{ base: 'block', md: 'none' }} src='assets/marketing/mobile-doinfine-homepage.png' />
    </VStack >
  );
};
