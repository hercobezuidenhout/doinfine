import { Button, Card, Clipboard, Heading, IconButton, Input, InputGroup, Stack, Text, VStack } from "@chakra-ui/react";

export default function Page() {

    return (
        <>
            <Card.Root variant="subtle">
                <Card.Body>
                    <VStack gap={8}>
                        <VStack gap={2}>
                            <Heading size="2xl">🙌</Heading>
                            <Heading>Success!</Heading>
                        </VStack>
                        <Text textAlign="center">
                            Your group has been created.
                            You can share the below link with your friends to invite them to the group.
                        </Text>
                        <Clipboard.Root width="full" value="https://chakra-ui.com">
                            <InputGroup endElement={
                                <Clipboard.Trigger asChild>
                                    <IconButton variant="surface" size="xs" me="-2">
                                        <Clipboard.Indicator />
                                    </IconButton>
                                </Clipboard.Trigger>
                            }>
                                <Clipboard.Input asChild>
                                    <Input variant="outline" />
                                </Clipboard.Input>
                            </InputGroup>
                        </Clipboard.Root>
                    </VStack>
                </Card.Body>
            </Card.Root>
            <VStack alignItems="stretch" gap={2}>
                <Button>Continue</Button>
                <Button variant="outline">Share</Button>
            </VStack>
        </>
    );
}