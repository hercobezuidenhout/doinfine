'use client';

import { Button, VStack } from "@chakra-ui/react";

export const UnAuthenticatedActionButtons = () => {

    return (
        <VStack alignItems="stretch" gap={2}>
            <Button>Sign in and accept</Button>
            <Button variant="outline">Sign in and decline</Button>
        </VStack>
    );
};