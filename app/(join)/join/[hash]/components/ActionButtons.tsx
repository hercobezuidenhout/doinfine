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
        await mutateAsync({ responseType: InviteResponseType.ACCEPTED });
        router.push('/scopes');
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
