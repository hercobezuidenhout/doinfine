import { Card, Tabs, Text } from "@chakra-ui/react";
import { GuildHeader } from "../../components/GuildHeader";
import { Feed } from "@/app/components/Feed";
import { getScopeDetails } from "@/prisma/queries/get-scope-details";
import { GuildMembers } from "./components/GuildMembers";

export default async function GuildPage({ params }: { params: Promise<{ guildId: number; }>; }) {
    const { guildId } = await params;
    const guild = await getScopeDetails(Number(guildId));

    return (
        <>
            <GuildHeader title={guild.name} />
            <Card.Root variant="subtle">
                <Card.Body>
                    <Text>
                        {guild.description}
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
                <Tabs.Content value="members">
                    <GuildMembers scopeId={guildId} />
                </Tabs.Content>
            </Tabs.Root>
        </>
    );

}