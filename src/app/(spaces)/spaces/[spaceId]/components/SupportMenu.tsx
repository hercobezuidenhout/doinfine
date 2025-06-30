import {
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import {
  FaEnvelope,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';
import { FiHelpCircle } from 'react-icons/fi';

export const SupportMenu = () => {
  //TODO: Simplify with {menuItems.map()}, add external link icons
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        size="md"
        aria-label="Options"
        icon={<FiHelpCircle />}
      />
      <MenuList>
        <MenuItem
          as={Link}
          href="https://www.youtube.com/@doinfinehq"
          icon={<FaYoutube />}
        >
          Youtube
        </MenuItem>
        <MenuItem
          as={Link}
          href="mailto:support@doinfine.app?subject=<Add your subject here>"
          icon={<FaEnvelope />}
        >
          Email Support
        </MenuItem>
        <MenuDivider />
        <MenuItem
          as={Link}
          href="https://twitter.com/DoinfineHQ"
          icon={<FaXTwitter />}
        >
          X (Twitter)
        </MenuItem>
        <MenuItem
          as={Link}
          href="https://www.linkedin.com/company/doinfine"
          icon={<FaLinkedin />}
        >
          LinkedIn
        </MenuItem>
        <MenuDivider />
      </MenuList>
    </Menu>
  );
};
