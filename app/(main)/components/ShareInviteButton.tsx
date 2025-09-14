'use client';

import { useCreateInvitationMutation } from "@/mutations/useCreateInvitationMutation";
import { Button } from "@chakra-ui/react";

interface ShareInviteButtonProps {
    scopeId: number;
}

export const ShareInviteButton = ({ scopeId }: ShareInviteButtonProps) => {
    const { mutateAsync: createInvite, isPending } = useCreateInvitationMutation();

    const handleShare = async () => {
        const invite = await createInvite({ scopeId });
        const link = `${window.location.origin}/join/${invite.hash}`;

        if (navigator.share) {
            navigator.share({
                title: "Join my group on Doinfine!",
                text: "Join my group on Doinfine!",
                url: link,
            });
        }
    };

    return (
        <Button loading={isPending} variant="outline" onClick={handleShare}>Share invite</Button>
    );
};