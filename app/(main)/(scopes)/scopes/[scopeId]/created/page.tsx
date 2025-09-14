import { Card, VStack } from "@chakra-ui/react"
import { SuccessHeader } from "./components/SuccessHeader"
import { SuccessDescription } from "./components/SuccessDescription"
import { InviteClipboard } from "./components/InviteClipboard"
import { ActionButtons } from "./components/ActionButtons"

export default async function Page({ params }: { params: Promise<{ scopeId: number }> }) {
    const { scopeId } = await params

    return (
        <>
            <Card.Root variant="subtle">
                <Card.Body>
                    <VStack gap={8}>
                        <SuccessHeader />
                        <SuccessDescription />
                        <InviteClipboard scopeId={scopeId} />
                    </VStack>
                </Card.Body>
            </Card.Root>
            <ActionButtons scopeId={scopeId} />
        </>
    )
}