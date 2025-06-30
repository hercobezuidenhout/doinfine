import { Flex, Heading, HStack, Spacer, Link } from '@chakra-ui/react';
import { HeaderContainer } from './components/HeaderContainer';
import { DoinfineLogo } from '@/lib/images/DoinfineLogo';

export const MarketingHeader = () => {
  return (
    <HeaderContainer>
      <Flex
        flexGrow={1}
        as="nav"
        align="center"
        width="100%"
        maxWidth="container.xl"
        wrap={{ base: 'wrap', md: 'nowrap' }}
        px={8}
        py={{ base: 2, md: 4 }}
        marginInline="auto"
      >
        <HStack gap={4} as={Link} href="/" variant="unstyled">
          <DoinfineLogo />
          <Heading display={{ base: 'none', md: 'block' }} size="lg">
            Doinfine
          </Heading>
        </HStack>
        <Spacer />
        <HStack gap={8}>
          <Link variant="highlight" href="/login">
            <Heading size="md">Log in</Heading>
          </Link>
          <Link variant="highlight" href="/signup">
            <Heading size="md">Sign up</Heading>
          </Link>
        </HStack>
      </Flex>
    </HeaderContainer>
  );
};

export default MarketingHeader;
