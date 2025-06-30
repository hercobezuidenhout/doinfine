import {
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Spacer,
  VStack,
  Link
} from '@chakra-ui/react';
import { DoinfineLogo } from '@/lib/images/DoinfineLogo';

export const MarketingFooter = () => {
  return (
    <Box
      as="footer"
      boxShadow="rgba(23, 92, 211, 0.20) 0 0 120px 50px"
      width="full"
    >
      <Divider borderColor="chakra-primary-color" />
      <VStack
        align="stretch"
        p={8}
        maxW="container.xl"
        marginInline="auto"
        gap={8}
      >
        <Flex flexWrap="wrap" gap={8}>
          <Flex
            flexGrow={2}
            justifyContent="space-between"
            flexDirection={{ base: 'row', md: 'column' }}
            alignItems={{ base: 'center', md: 'flex-start' }}
          >
            <HStack
              gap={4}
              as={Link}
              href="/"
              variant="unstyled"
            >
              <DoinfineLogo />
              <Heading size="md" textDecoration="none">
                Doinfine
              </Heading>
            </HStack>
            <Spacer />
          </Flex>
        </Flex>
      </VStack>
    </Box>
  );
};
