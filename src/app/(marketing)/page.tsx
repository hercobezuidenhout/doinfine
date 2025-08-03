import { VStack } from '@chakra-ui/react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { HeroSection } from './components/HeroSection';
import { getFeatureFlags } from '@/prisma/queries/get-feature-flags';
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
        <GetStartedSection />
      </VStack>
    </HydrationBoundary>
  );
};

export default MarketingPage;
