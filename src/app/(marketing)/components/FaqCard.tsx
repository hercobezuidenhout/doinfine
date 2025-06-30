import {
  AccordionButton,
  AccordionItem,
  AccordionPanel,
  Card,
  CardBody,
  Heading,
  HStack,
  Spacer,
} from '@chakra-ui/react';
import { FaqAccordionIcon } from './FaqAccordionIcon';

interface FaqCardProps {
  question: string;
  answer: string;
  index: number;
}

export const FaqCard = ({ question, answer, index }: FaqCardProps) => {
  return (
    <Card as={AccordionItem}>
      <CardBody p={0}>
        <AccordionButton px={0}>
          <HStack width="full">
            <Heading as="h3" size="sm">
              {question}
            </Heading>
            <Spacer />
            <FaqAccordionIcon index={index} />
          </HStack>
        </AccordionButton>
        <AccordionPanel>{answer}</AccordionPanel>
      </CardBody>
    </Card>
  );
};
