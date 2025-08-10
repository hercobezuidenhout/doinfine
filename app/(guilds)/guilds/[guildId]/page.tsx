import { Card, Tabs, Text } from "@chakra-ui/react";
import { GuildHeader } from "../../components/GuildHeader";
import { Feed } from "@/app/components/Feed";

export default async function GuildPage({ params }: { params: Promise<{ guildId: string; }>; }) {
    const { guildId } = await params;

    return (
        <>
            <GuildHeader title={`Guild ${guildId}`} />
            <Card.Root variant="subtle">
                <Card.Body>
                    <Text>
                        Drop your beer... and you get fined!
                    </Text>
                </Card.Body>
            </Card.Root>

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
                    <Feed scopeId={guildId} />
                </Tabs.Content>
                <Tabs.Content value="members">Manage your projects</Tabs.Content>
            </Tabs.Root>
        </>
    );

}