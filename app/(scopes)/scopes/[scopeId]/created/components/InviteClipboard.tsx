"use client";
import { Clipboard, IconButton, Input, InputGroup } from "@chakra-ui/react";

interface InviteClipboardProps {
    value: string;
}

export const InviteClipboard = ({ value }: InviteClipboardProps) => {
    return (
        <Clipboard.Root width="full" value={value}>
            <InputGroup
                endElement={
                    <Clipboard.Trigger asChild>
                        <IconButton variant="surface" size="xs" me="-2">
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
