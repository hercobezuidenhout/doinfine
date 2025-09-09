import { Card, Heading, VStack } from "@chakra-ui/react";
import { getInvitationByHash } from "@/prisma/queries/get-invitation-by-hash";
import { InviteHeader } from "./components/InviteHeader";
import { InviteDescription } from "./components/InviteDescription";
import { ActionButtons } from "./components/ActionButtons";


export default async function Page({ params }: { params: Promise<{ hash: string; }>; }) {
    const { hash } = await params;
    const invitation = await getInvitationByHash(hash);

    return invitation && (
        <>
            <Card.Root variant="subtle">
                <Card.Body>
                    <VStack gap={8}>
                        <InviteHeader />
                        <InviteDescription />
                        <Heading size="md">{invitation.scope.name}</Heading>
                    </VStack>
                </Card.Body>
            </Card.Root>
            <ActionButtons inviteId={invitation?.id} />
        </>
    );
}