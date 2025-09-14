import { Heading, VStack } from "@chakra-ui/react";
import { Feed } from "../components/Feed";

export default function Home() {
    return (
        <VStack alignItems="stretch">
            <Heading size="5xl">Feed</Heading>
            <Feed />
        </VStack>
    );
}
