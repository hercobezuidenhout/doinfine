import {
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListIcon,
  ListItem,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import Check from '../../../../public/assets/marketing/check.webp';

interface PricingPlanCardProps {
  name: string;
  value: number;
  unit?: string;
  audience: string;
  benefits: string[];
  highlight?: boolean;
}

export const PricingPlanCard = ({
  name,
  value,
  unit = '',
  audience,
  benefits,
  highlight = false,
}: PricingPlanCardProps) => (
  <Card variant={highlight ? 'highlight' : undefined}>
    <CardHeader>
      <VStack align="flex-start">
        <Heading size="xl" fontStyle="bold">
          {name}
        </Heading>
        <Heading alignItems="flex-start" display="flex">
          <Text as="span">{'R' + value}</Text>
          <Text
            fontSize="md"
            as="span"
            fontWeight="light"
            pt={1}
            color="chakra-subtle-text"
          >
            {unit}
          </Text>
        </Heading>
        <Text>{audience}</Text>
      </VStack>
    </CardHeader>
    <CardBody>
      <VStack alignItems="stretch" h="full">
        <List spacing={4}>
          {benefits.map((benefit) => (
            <ListItem key={benefit}>
              <ListIcon as={Image} src={Check} alt="bullet" />
              {benefit}
            </ListItem>
          ))}
        </List>
        <Spacer minH={8} />
      </VStack>
    </CardBody>
  </Card>
);
