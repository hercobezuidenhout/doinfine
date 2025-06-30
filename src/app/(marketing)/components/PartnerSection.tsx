import { Flex, Link } from '@chakra-ui/react';
import Image from 'next/image';
import EntelectLogo from '../../../../public/assets/marketing/entelect-logo.webp';

const partners = {
  Entelect: {
    href: 'https://entelect.co.za/',
    src: EntelectLogo,
  },
};

export const PartnerSection = () => {
  return (
    <Flex justifyContent="center">
      {Object.entries(partners).map(([key, { href, src }]) => (
        <Link key={key} isExternal href={href}>
          <Image src={src} alt={key} />
        </Link>
      ))}
    </Flex>
  );
};
