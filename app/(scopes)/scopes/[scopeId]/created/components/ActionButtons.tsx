"use client";
import { Button, VStack } from "@chakra-ui/react";

export const ActionButtons = () => (
    <VStack alignItems="stretch" gap={2}>
        <Button>Continue</Button>
        <Button variant="outline">Share</Button>
    </VStack>
);
