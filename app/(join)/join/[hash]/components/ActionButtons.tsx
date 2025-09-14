"use client";
import { useRespondInviteMutation } from "@/mutations/useRespondInviteMutation";
import { Button, VStack } from "@chakra-ui/react";
import { InviteResponseType } from "@prisma/client";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
    inviteId: number;
}

export const ActionButtons = ({ inviteId }: ActionButtonsProps) => {
    const { mutateAsync, isPending } = useRespondInviteMutation(inviteId);
    const router = useRouter();

    const handleAccept = async () => {
        try {
            const response = await mutateAsync({ responseType: InviteResponseType.ACCEPTED });

            if (response.status === 200) {
                router.push(`/scopes`);
            } else {
                const data = await response.json();
                alert(data.message);
            }
        } catch (error) {
            console.error("Failed to accept invitation:", error);
        }
    };

    const handleDecline = async () => {
        await mutateAsync({ responseType: InviteResponseType.DECLINED });
        router.push('/');
    };

    return (
        <VStack alignItems="stretch" gap={2}>
            <Button disabled={isPending} onClick={handleAccept}>Accept</Button>
            <Button disabled={isPending} variant="outline" onClick={handleDecline}>Decline</Button>
        </VStack>
    );
};
