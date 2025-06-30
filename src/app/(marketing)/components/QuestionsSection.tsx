import { Grid, Heading, VStack } from '@chakra-ui/react';
import { ContactUsForm } from './ContactUsForm';
import { FrequentlyAskedQuestions } from './FrequentlyAskedQuestions';

export const QuestionsSection = () => {
  return (
    <VStack spacing={8} id="faq">
      <Heading as="h1">Got Questions?</Heading>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
        gap={16}
        w="full"
      >
        <ContactUsForm />
        <FrequentlyAskedQuestions />
      </Grid>
    </VStack>
  );
};
