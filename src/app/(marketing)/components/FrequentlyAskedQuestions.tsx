import { Accordion, Heading, VStack } from '@chakra-ui/react';
import data from '../../../../public/assets/marketing/frequently-asked-questions.json';
import { FaqCard } from './FaqCard';

export const FrequentlyAskedQuestions = () => {
  return (
    <VStack align="stretch" gap={4}>
      <Heading size="md" as="h2">
        FAQS
      </Heading>
      <VStack as={Accordion} variant="unstyled" spacing={8} align="stretch">
        {data.map((props, index) => (
          <FaqCard key={props.question} {...props} index={index} />
        ))}
      </VStack>
    </VStack>
  );
};
