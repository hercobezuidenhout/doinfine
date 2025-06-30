'use client';

import { useAccordionContext } from '@chakra-ui/accordion';
import { ICONS } from '@/lib/icons/icons';
import { Center, Icon } from '@chakra-ui/react';

export const FaqAccordionIcon = ({ index }: { index: number; }) => {
  const { index: expandedIndex } = useAccordionContext();
  const isExpanded = index === expandedIndex;
  return (
    <Center bg="primary.500" borderRadius="50%" h={6} w={6} p={0}>
      <Icon h={4} w={4} as={isExpanded ? ICONS.MinusIcon : ICONS.PlusIcon} />
    </Center>
  );
};
