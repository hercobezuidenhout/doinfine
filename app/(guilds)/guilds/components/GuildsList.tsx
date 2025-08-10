'use client';

import { useCurrentUserScopesQuery } from "@/queries/useCurrentUserScopesQuery";
import { HStack, Input, InputGroup, Separator, Stack, Text } from "@chakra-ui/react";
import { Scope } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { LuSearch } from "react-icons/lu";

export const GuildsList = () => {
    const [filter, setFilter] = React.useState("");
    const { data: guilds } = useCurrentUserScopesQuery();
    const router = useRouter();

    return (
        <>
            <InputGroup startElement={<LuSearch />}>
                <Input placeholder="Search guilds" value={filter} onChange={(event) => setFilter(event.target.value)} />
            </InputGroup>

            {guilds?.filter((guild: Scope) =>
                !filter ||
                guild.name.toLowerCase().includes(filter.toLowerCase()) ||
                guild.description?.toLowerCase().includes(filter.toLowerCase())
            ).map((group: Scope, index: number) => (
                <React.Fragment key={group.id}>
                    <HStack gap="6" cursor="pointer" onClick={() => router.push(`/guilds/${group.id}`)}>
                        <Stack gap="2">
                            <Text fontWeight="bold">{group.name}</Text>
                            <Text color="fg.muted" textStyle="sm">
                                {group.description}
                            </Text>
                        </Stack>
                    </HStack>
                    {index !== guilds.length - 1 && <Separator />}
                </React.Fragment>
            ))}
        </>
    );
};