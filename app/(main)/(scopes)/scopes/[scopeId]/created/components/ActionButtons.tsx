"use client";
import { ShareInviteButton } from "@/app/(main)/components/ShareInviteButton";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
    scopeId: number;
}

export const ActionButtons = ({ scopeId }: ActionButtonsProps) => {
    const router = useRouter();
    const canShare = typeof window !== "undefined" && !!navigator.share;

    const handleContinue = () => {
        router.push(`/scopes/${scopeId}`);
    };


    return (
        <VStack alignItems="stretch" gap={2}>
            <Button onClick={handleContinue}>Continue</Button>
            {canShare && (
                <ShareInviteButton scopeId={scopeId} />
            )}
        </VStack>
    );
};
