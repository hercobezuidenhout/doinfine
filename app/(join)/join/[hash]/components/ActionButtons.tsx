"use client";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
    inviteId: number;
}

export const ActionButtons = ({ inviteId }: ActionButtonsProps) => {
    const router = useRouter();
    const canShare = typeof window !== "undefined" && !!navigator.share;

    return (
        <VStack alignItems="stretch" gap={2}>
            <Button onClick={() => { }}>Accept</Button>
            <Button variant="outline" onClick={() => { }}>Decline</Button>
        </VStack>
    );
};
