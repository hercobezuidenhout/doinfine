import { VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";

export default function GuildsLayout({ children }: PropsWithChildren) {

    return (
        <VStack alignItems="stretch" gap={4} padding={4}>
            {children}
        </VStack>
    );
}