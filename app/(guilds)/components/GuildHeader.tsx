import { VStack, HStack, Icon, Heading } from "@chakra-ui/react";
import { LuShieldHalf } from "react-icons/lu";
import { BackButton } from "./BackButton";
import { CreateGuildDrawer } from "./CreateGuildDrawer";

interface GuildHeaderProps {
    title?: string;
}

const DEFAULT_TITLE = 'Guilds';

export const GuildHeader = ({ title = DEFAULT_TITLE }: GuildHeaderProps) => (
    <VStack alignItems="start" width="full">
        <BackButton />
        <HStack justifyContent="space-between" width="full">
            <HStack>
                <Icon size="lg"><LuShieldHalf /></Icon>
                <Heading size="2xl">{title}</Heading>
            </HStack>
            <CreateGuildDrawer />
        </HStack>
    </VStack>
);