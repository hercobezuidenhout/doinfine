'use client';

import { Stack, Blockquote, Card, Heading } from "@chakra-ui/react";

export const ReviewGuildStep = () => {

    return (
        <Stack gap={4}>
            <Blockquote.Root>
                <Blockquote.Content>
                    Please review your guild before you continue.
                </Blockquote.Content>
            </Blockquote.Root>
            <Card.Root size="sm">
                <Card.Header>
                    <Heading size="md">Pink Fluffy Kittens</Heading>
                </Card.Header>
                <Card.Body color="fg.muted">
                    We march with paws of silk and claws of steel, purring in peace until the moment to strike.
                </Card.Body>
            </Card.Root>
        </Stack>
    );
};