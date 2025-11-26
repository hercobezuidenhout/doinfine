'use client';

import { HStack, Heading, Image } from "@chakra-ui/react";
import { useEffect } from "react";
import { MenuDrawer } from "./MenuDrawer";
import { NotificationsDrawer } from "./NotificationsDrawer";



export const AppHeader = () => {
  const checkForUser = async () => {
    await fetch('/api/v1/current');
  };

  useEffect(() => {
    checkForUser();
  }, []);

  return (
    <HStack alignItems="center" justifyContent="space-between" padding={{ base: 2, md: 4 }} position="sticky" left={0} right={0} top={0}>
      <HStack gap={4}>
        <Image src="/assets/logo.jpg" width="44px" borderRadius="full" alt="Doinfine logo" />
        <Heading size="2xl">Doinfine</Heading>
      </HStack>
      <HStack gap={4}>
        <NotificationsDrawer />
        <MenuDrawer />
      </HStack>
    </HStack>
  );
};