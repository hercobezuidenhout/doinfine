import { VStack } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import MarketingHeader from './header';
import { MarketingProviders } from './providers';
import { MarketingFooter } from './footer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Doinfine',
  description: 'Helping teams build stronger, more engaged cultures.',
};


const MarketingLayout = ({ children }: PropsWithChildren) => {
  return (
    <MarketingProviders>
      <VStack minH="100vh" gap={0}>
        <MarketingHeader />
        <VStack
          as="main"
          px={8}
          maxW="container.xl"
          width="full"
          marginInline="auto"
          flexGrow={1}
          justifyContent="center"
          alignItems="stretch"
        >
          {children}
        </VStack>
        <MarketingFooter />
      </VStack>
    </MarketingProviders>
  );
};

export default MarketingLayout;
