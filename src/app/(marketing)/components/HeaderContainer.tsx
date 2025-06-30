'use client';

import { PropsWithChildren } from 'react';
import { VStack } from '@chakra-ui/react';
import { useWindowScroll } from 'react-use';

export const HeaderContainer = ({ children }: PropsWithChildren) => {
  const { y } = useWindowScroll();
  const isScrolled = y > 0;
  return (
    <VStack
      as="header"
      width="100%"
      align="stretch"
      transition="background-color .2s ease-in-out"
      position="sticky"
      top={0}
      zIndex={1000}
      bgColor={isScrolled ? 'chakra-body-bg' : 'transparent'}
      overscrollBehavior="contain"
    >
      {children}
    </VStack>
  );
};
