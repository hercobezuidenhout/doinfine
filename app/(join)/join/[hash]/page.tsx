import { Card, Heading, VStack } from "@chakra-ui/react";
import { getInvitationByHash } from "@/prisma/queries/get-invitation-by-hash";
import { InviteHeader } from "./components/InviteHeader";
import { InviteDescription } from "./components/InviteDescription";
import { ActionButtons } from "./components/ActionButtons";
import { createClient } from "@/utils/supabase/server";
import { UnAuthenticatedActionButtons } from "./components/UnauthenticatedActionButtons";
import { getScopeMembers } from "@/prisma/queries/get-scope-members";
import { createInviteResponse } from "@/prisma/commands/create-invite-response";
import { InviteResponse, InviteResponseType } from "@prisma/client";
import { createScopeRole } from "@/prisma/commands/create-scope-role";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

type PageParams = {
    params: Promise<{ hash: string; }>;
    searchParams: Promise<{ [key: string]: string | string[] | undefined; }>;
};

export default async function Page({ params, searchParams }: PageParams) {
    const { hash } = await params;
    const invitation = await getInvitationByHash(hash);

    if (!invitation) {
        return <Heading textAlign="center" mt={12}>Invalid invitation link</Heading>;
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const responseType = await searchParams.then(params => params.responseType as string | undefined);

    console.log("Response Type:", responseType);

    if (responseType && user) {
        const scopeMembers = await getScopeMembers(invitation?.scopeId);
        if (scopeMembers.find(member => member.id === user?.id)) {
            return <Heading textAlign="center" mt={12}>You are already a member</Heading>;
        }

        await createInviteResponse({
            invitationId: invitation.id,
            userId: user.id,
            responseType: responseType as InviteResponseType,
        });

        if (responseType === InviteResponseType.ACCEPTED) {
            await createScopeRole({
                userId: user.id,
                scopeId: invitation.scopeId
            });
        }

        redirect(`/scopes/${invitation.scopeId}`);
    }

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
            {user && <ActionButtons inviteId={invitation?.id} />}
            {!user && <UnAuthenticatedActionButtons hash={hash} />}
        </>
    );
}