import { Heading, HStack, Icon, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { BackButton } from "./components/BackButton";
import { LuShieldHalf } from "react-icons/lu";

export default function GuildsLayout({ children }: PropsWithChildren) {

    return (
        <VStack alignItems="stretch" gap={4} padding={4}>
            <VStack alignItems="start" width="full">
                <BackButton />
                <HStack>
                    <Icon size="lg"><LuShieldHalf /></Icon>
                    <Heading size="2xl">
                        Guilds</Heading>
                </HStack>
            </VStack>
            {children}
        </VStack>
    );
}