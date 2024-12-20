import { Divider, Heading, HStack, VStack } from '@chakra-ui/react';
import React from 'react';
import { DoinfineLogo } from '@/lib/images/DoinfineLogo';
import { ProfileMenu } from './ProfileMenu';
import { SupportMenu } from './SupportMenu';
import { NavDrawerToggle } from './NavDrawerToggle';

export const SpacesHeader = () => (
  <VStack position="fixed" alignItems="stretch" width="full" gap="3" zIndex="10" backgroundColor="white" borderBottomColor="chakra-subtle-bg" borderWidth="1px">
    <HStack width='full' margin="auto" py={1} px={3} justifyContent="space-between">
      <HStack gap={{ base: 2, md: 5 }}>
        <NavDrawerToggle />
        <HStack>
          <DoinfineLogo />
          <Heading display={{ base: 'none', md: 'block' }}>Doinfine</Heading>
        </HStack>
      </HStack>


      <HStack gap={{ base: 2, md: 5 }}>
        <HStack>
          <SupportMenu />
        </HStack>
        <Divider orientation="vertical" height={5} />
        <ProfileMenu />
      </HStack>
    </HStack>
  </VStack>
);
