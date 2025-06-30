import { Box, Flex, Heading, VStack } from '@chakra-ui/react';
import PricingPlans from '../../../../public/assets/marketing/pricing-plans.json';
import { PricingPlanCard } from './PricingPlanCard';

export const PricingPlansSection = () => {
  return (
    <VStack spacing={8}>
      <Heading>Pricing Plans</Heading>
      <Flex
        w="full"
        flexWrap="wrap"
        gap={4}
        justifyContent="center"
        alignItems="stretch"
      >
        {PricingPlans.map((pricingPlan) => (
          <Box
            key={pricingPlan.name}
            flexBasis={{
              base: '100%',
              md: 'calc((100% - 1rem)/ 2)',
              lg: 'calc((100% - 2rem)/ 3)',
            }}
          >
            <PricingPlanCard {...pricingPlan} {...pricingPlan.price} />
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};
