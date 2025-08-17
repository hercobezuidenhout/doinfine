'use client';

import { useCurrentUserScopesQuery } from "@/queries/useCurrentUserScopesQuery";
import { HStack, Input, InputGroup, Separator, Stack, Text } from "@chakra-ui/react";
import { Scope } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { LuSearch } from "react-icons/lu";

export const ScopesList = () => {
    const [filter, setFilter] = React.useState("");
    const { data: scopes } = useCurrentUserScopesQuery();
    const router = useRouter();

    return (
        <>
            <InputGroup startElement={<LuSearch />}>
                <Input placeholder="Search groups" value={filter} onChange={(event) => setFilter(event.target.value)} />
            </InputGroup>

            {scopes?.filter((scope: Scope) =>
                !filter ||
                scope.name.toLowerCase().includes(filter.toLowerCase()) ||
                scope.description?.toLowerCase().includes(filter.toLowerCase())
            ).map((scope: Scope, index: number) => (
                <React.Fragment key={scope.id}>
                    <HStack gap="6" cursor="pointer" onClick={() => router.push(`/guilds/${scope.id}`)}>
                        <Stack gap="2">
                            <Text fontWeight="bold">{scope.name}</Text>
                            <Text color="fg.muted" textStyle="sm">
                                {scope.description}
                            </Text>
                        </Stack>
                    </HStack>
                    {index !== scopes.length - 1 && <Separator />}
                </React.Fragment>
            ))}
        </>
    );
};