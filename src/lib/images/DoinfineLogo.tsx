import { LogoIcon } from '@/lib/icons/LogoIcon';
import { Box } from '@chakra-ui/react';

export const DoinfineLogo = () => (
  <Box bgColor="red.500" borderRadius="50%" m={1} p={1}>
    <LogoIcon
      w={{ base: 8, md: 8 }}
      h={{ base: 8, md: 8 }}
      color="brand.primary"
    />
  </Box>
);
