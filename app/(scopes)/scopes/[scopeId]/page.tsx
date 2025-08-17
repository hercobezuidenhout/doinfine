import { Card, Tabs, Text } from "@chakra-ui/react";
import { ScopeHeader } from "../../components/ScopeHeader";
import { Feed } from "@/app/components/Feed";
import { getScopeDetails } from "@/prisma/queries/get-scope-details";
import { ScopeMembers } from "./components/ScopeMembers";

export default async function Page({ params }: { params: Promise<{ scopeId: number; }>; }) {
    const { scopeId } = await params;
    const scope = await getScopeDetails(Number(scopeId));

    return (
        <>
            <ScopeHeader title={scope.name} scopeId={scopeId} />
            {scope.description && (
                <Card.Root variant="subtle">
                    <Card.Body>
                        <Text>
                            {scope.description}
                        </Text>
                    </Card.Body>
                </Card.Root>
            )}

            <Tabs.Root defaultValue="posts" position="sticky" top={0}>
                <Tabs.List position="sticky" top={0} zIndex={1} bg={{ base: 'white', _dark: 'black' }} pt={2}>
                    <Tabs.Trigger value="posts">
                        Posts
                    </Tabs.Trigger>
                    <Tabs.Trigger value="members">
                        Members
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content value="posts">
                    <Feed scopeId={scopeId} />
                </Tabs.Content>
                <Tabs.Content value="members">
                    <ScopeMembers scopeId={scopeId} />
                </Tabs.Content>
            </Tabs.Root>
        </>
    );

}