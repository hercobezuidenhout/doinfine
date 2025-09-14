import { Heading, VStack } from "@chakra-ui/react"
import { Feed } from "../components/Feed"

export default function Home() {
    return (
        <VStack alignItems="stretch">
            <Heading size={{ base: "3xl", md: "5xl" }}>Feed</Heading>
            <Feed />
        </VStack>
    )
}
