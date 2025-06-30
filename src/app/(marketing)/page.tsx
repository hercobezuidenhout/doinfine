import { VStack } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { HeroSection } from './components/HeroSection';
import { BenefitsSection } from './components/BenefitsSection';
import { getFeatureFlags } from '@/prisma/queries/get-feature-flags';
import { TestimonialsSection } from './components/TestimonialsSection';
import { GetStartedSection } from './components/GetStartedSection';
import { RefreshLoggedInUser } from './components/RefreshLoggedInUser';

const MarketingPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['feature-flags'],
    queryFn: () => getFeatureFlags(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RefreshLoggedInUser />
      <VStack alignItems="stretch" gap={32} pb={32}>
        <HeroSection />
        {/* <PartnerSection /> */}
        <BenefitsSection />
        <TestimonialsSection />
        {/* <PricingPlansSection /> */}
        {/* <QuestionsSection /> */}
        <GetStartedSection />
      </VStack>
    </HydrationBoundary>
  );
};

export default MarketingPage;
