'use client';

import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface UnAuthenticatedActionButtonsProps {
    hash: string;
}

export const UnAuthenticatedActionButtons = ({ hash }: UnAuthenticatedActionButtonsProps) => {
    const router = useRouter();

    const handleAccept = () => {
        router.push(`/login/?redirectTo=/join/${hash}?responseType=ACCEPTED`);
    };

    const handleDecline = () => {
        router.push(`/login/?redirectTo=/join/${hash}?responseType=DECLINED`);
    };

    return (
        <VStack alignItems="stretch" gap={2}>
            <Button onClick={handleAccept}>Sign in and accept</Button>
            <Button onClick={handleDecline} variant="outline">Sign in and decline</Button>
        </VStack>
    );
};