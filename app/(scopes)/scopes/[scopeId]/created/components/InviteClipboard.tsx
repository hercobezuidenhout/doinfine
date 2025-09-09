"use client";
import { useCreateInvitationMutation } from "@/mutations/useCreateInvitationMutation";
import { Clipboard, IconButton, Input, InputGroup } from "@chakra-ui/react";
import { useEffect, useState } from "react";

interface InviteClipboardProps {
    scopeId: number;
}

export const InviteClipboard = ({ scopeId }: InviteClipboardProps) => {
    const { mutateAsync: createInvite, isPending } = useCreateInvitationMutation();
    const [inviteLink, setInviteLink] = useState('');


    useEffect(() => {
        const generateInviteLink = async () => {
            const invite = await createInvite({ scopeId });
            const link = `${window.location.origin}/join/${invite.hash}`;
            setInviteLink(link);
        };

        generateInviteLink();
    }, [scopeId, createInvite]);

    return (
        <Clipboard.Root width="full" value={isPending ? 'Loading...' : inviteLink}>
            <InputGroup
                endElement={
                    <Clipboard.Trigger asChild>
                        <IconButton variant="surface" size="xs" me="-2" loading={isPending}>
                            <Clipboard.Indicator />
                        </IconButton>
                    </Clipboard.Trigger>
                }
            >
                <Clipboard.Input asChild>
                    <Input variant="outline" />
                </Clipboard.Input>
            </InputGroup>
        </Clipboard.Root>
    );
};
