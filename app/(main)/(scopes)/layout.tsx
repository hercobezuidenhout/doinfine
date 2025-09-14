import { VStack } from "@chakra-ui/react"
import { PropsWithChildren } from "react"

export default function Layout({ children }: PropsWithChildren) {

    return (
        <VStack alignItems="stretch" gap={4}>
            {children}
        </VStack>
    )
}