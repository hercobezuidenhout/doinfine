import { Button, Card, Clipboard, Heading, IconButton, Input, InputGroup, Stack, Text, VStack } from "@chakra-ui/react";

export default function Page() {

    return (
        <>
            <Card.Root>
                <VStack gap={8} pt={16}>
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
                                <Input />
                            </Clipboard.Input>
                        </InputGroup>
                    </Clipboard.Root>
                </VStack>
            </Card.Root>
            <Button mt={6}>Continue to group</Button>
        </>
    );
}