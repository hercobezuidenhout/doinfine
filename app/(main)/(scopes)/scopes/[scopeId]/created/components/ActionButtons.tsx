"use client";
import { Button, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
    scopeId: number;
    inviteLink: string;
}

export const ActionButtons = ({ scopeId, inviteLink }: ActionButtonsProps) => {
    const router = useRouter();
    const canShare = typeof window !== "undefined" && !!navigator.share;

    const handleContinue = () => {
        router.push(`/scopes/${scopeId}`);
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: "Join my group on Doinfine!",
                text: "Join my group on Doinfine!",
                url: inviteLink,
            });
        }
    };

    return (
        <VStack alignItems="stretch" gap={2}>
            <Button onClick={handleContinue}>Continue</Button>
            {canShare && (
                <Button variant="outline" onClick={handleShare}>Share</Button>
            )}
        </VStack>
    );
};
