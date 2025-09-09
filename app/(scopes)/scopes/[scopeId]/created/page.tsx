import { Card, VStack } from "@chakra-ui/react";
import { SuccessHeader } from "./components/SuccessHeader";
import { SuccessDescription } from "./components/SuccessDescription";
import { InviteClipboard } from "./components/InviteClipboard";
import { ActionButtons } from "./components/ActionButtons";

export default function Page() {
    return (
        <>
            <Card.Root variant="subtle">
                <Card.Body>
                    <VStack gap={8}>
                        <SuccessHeader />
                        <SuccessDescription />
                        <InviteClipboard value="https://chakra-ui.com" />
                    </VStack>
                </Card.Body>
            </Card.Root>
            <ActionButtons />
        </>
    );
}