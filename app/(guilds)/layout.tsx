import { Heading, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { BackButton } from "./components/BackButton";

export default function GuildsLayout({ children }: PropsWithChildren) {

    return (
        <VStack alignItems="stretch" gap={4} padding={4}>
            <VStack alignItems="start" width="full">
                <BackButton />
                <Heading size="2xl">Guilds</Heading>
            </VStack>
            {children}
        </VStack>
    );
}